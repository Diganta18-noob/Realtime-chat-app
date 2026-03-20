import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import logger from "../utils/logger.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://orbitechat.vercel.app",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication error"));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userID;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  logger.info("A user connected", { socketId: socket.id });

  const userId = socket.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  (async () => {
    try {
      const { data: pendingMessages } = await supabase.from('messages')
        .select('id, sender_id')
        .eq('receiver_id', userId)
        .eq('status', 'sent');

      if (pendingMessages && pendingMessages.length > 0) {
        const messageIds = pendingMessages.map((m) => m.id);
        await supabase.from('messages')
          .update({ status: 'delivered' })
          .in('id', messageIds);

        const bySender = {};
        pendingMessages.forEach((m) => {
          const sid = m.sender_id;
          if (!bySender[sid]) bySender[sid] = [];
          bySender[sid].push(m.id);
        });

        Object.entries(bySender).forEach(([senderId, ids]) => {
          const senderSocketId = getReceiverSocketId(senderId);
          if (senderSocketId) {
            io.to(senderSocketId).emit("messages_delivered", {
              by: userId,
              messageIds: ids,
            });
          }
        });
      }
    } catch (error) {
      logger.error("Error marking messages delivered on connect:", { error: error.message });
    }
  })();

  socket.on("messages_read", async ({ senderId, receiverId }) => {
    try {
      const { data: unreadMsgs } = await supabase.from('messages')
        .select('id')
        .eq('sender_id', senderId)
        .eq('receiver_id', receiverId)
        .neq('status', 'read');
        
      if (unreadMsgs && unreadMsgs.length > 0) {
        const msgIds = unreadMsgs.map(m => m.id);
        
        await supabase.from('messages').update({ status: 'read' }).in('id', msgIds);
        
        const inserts = msgIds.map(id => ({ message_id: id, user_id: receiverId }));
        await supabase.from('message_read_by').upsert(inserts, { onConflict: 'message_id, user_id', ignoreDuplicates: true });

        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("messages_seen", {
            by: receiverId,
            messageIds: msgIds,
          });
        }
      }
    } catch (error) {
      logger.error("Error handling messages_read:", { error: error.message });
    }
  });

  socket.on("disconnect", () => {
    logger.info("User disconnected", { socketId: socket.id });
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server, userSocketMap };
