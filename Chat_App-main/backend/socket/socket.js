import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
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
  console.log("a user connected", socket.id);

  const userId = socket.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // On connect: mark all pending messages TO this user as 'delivered'
  (async () => {
    try {
      const pendingMessages = await Message.find({
        receiverId: userId,
        status: "sent",
      });

      if (pendingMessages.length > 0) {
        const messageIds = pendingMessages.map((m) => m._id);
        await Message.updateMany(
          { _id: { $in: messageIds } },
          { $set: { status: "delivered" } }
        );

        // Group by sender and notify each sender
        const bySender = {};
        pendingMessages.forEach((m) => {
          const sid = m.senderId.toString();
          if (!bySender[sid]) bySender[sid] = [];
          bySender[sid].push(m._id.toString());
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
      console.log("Error marking messages delivered on connect:", error.message);
    }
  })();

  // Handle messages_read: user opened a chat with senderId
  socket.on("messages_read", async ({ senderId, receiverId }) => {
    try {
      // Mark all messages from sender to receiver as read
      const result = await Message.updateMany(
        {
          senderId: senderId,
          receiverId: receiverId,
          readBy: { $nin: [receiverId] },
        },
        {
          $addToSet: { readBy: receiverId },
          $set: { status: "read" },
        }
      );

      if (result.modifiedCount > 0) {
        // Get the IDs of messages that were marked read
        const readMessages = await Message.find({
          senderId: senderId,
          receiverId: receiverId,
          status: "read",
        }).select("_id");

        const messageIds = readMessages.map((m) => m._id.toString());

        // Notify the sender
        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("messages_seen", {
            by: receiverId,
            messageIds,
          });
        }
      }
    } catch (error) {
      console.log("Error handling messages_read:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server, userSocketMap };
