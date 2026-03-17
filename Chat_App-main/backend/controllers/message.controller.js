import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, participants } = req.body;
    const adminId = req.user._id;

    if (!groupName || !participants || participants.length === 0) {
      return res.status(400).json({ error: "Group name and participants are required" });
    }

    // Add admin to participants if not already included
    const allParticipants = [...new Set([...participants, adminId.toString()])];

    const newGroup = await Conversation.create({
      isGroup: true,
      groupName,
      groupAdmin: adminId,
      participants: allParticipants,
      groupAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(groupName)}&background=random`,
    });

    // Populate user info for frontend
    await newGroup.populate("participants", "-password");

    // Emit socket event to all participants so they see the group immediately
    allParticipants.forEach((userId) => {
      const socketId = getReceiverSocketId(userId);
      if (socketId) {
        io.to(socketId).emit("newGroupCreated", newGroup);
      }
    });

    res.status(201).json(newGroup);
  } catch (error) {
    console.log("Error in createGroup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverOrGroupId } = req.params;
    const senderId = req.user._id;

    // First try to find if this is a group ID
    let conversation = await Conversation.findById(receiverOrGroupId);

    // If not found, it must be a DM, so look for a conversation with both participants
    if (!conversation) {
      conversation = await Conversation.findOne({
        isGroup: false,
        participants: { $all: [senderId, receiverOrGroupId] },
      });
    }

    // If STILL no conversation (first time DM), create it
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverOrGroupId],
      });
    }

    // Check if receiver is online to set initial status
    const receiverOnline = !conversation.isGroup && getReceiverSocketId(receiverOrGroupId);

    const newMessage = new Message({
      senderId,
      receiverId: conversation.isGroup ? null : receiverOrGroupId,
      message,
      status: receiverOnline ? "delivered" : "sent",
      readBy: [senderId], // Sender has read their own message
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Send real-time updates
    if (conversation.isGroup) {
      // Broadcast to all participants EXCEPT the sender
      conversation.participants.forEach((participantId) => {
        if (participantId.toString() !== senderId.toString()) {
          const socketId = getReceiverSocketId(participantId.toString());
          if (socketId) {
            io.to(socketId).emit("newMessage", { ...newMessage.toObject(), conversationId: conversation._id });
          }
        }
      });
    } else {
      // 1-on-1 DM
      const receiverSocketId = getReceiverSocketId(receiverOrGroupId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userOrGroupId } = req.params;
    const senderId = req.user._id;

    // Try finding by Group ID first
    let conversation = await Conversation.findById(userOrGroupId).populate("messages");

    // Otherwise find the DM
    if (!conversation) {
      conversation = await Conversation.findOne({
        isGroup: false,
        participants: { $all: [senderId, userOrGroupId] },
      }).populate("messages");
    }

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error on getting message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find all messages where current user is NOT in readBy
    const unreadMessages = await Message.aggregate([
      {
        $match: {
          receiverId: userId,
          readBy: { $nin: [userId] },
        },
      },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert to { senderId: count } map
    const counts = {};
    unreadMessages.forEach((item) => {
      counts[item._id.toString()] = item.count;
    });

    res.status(200).json(counts);
  } catch (error) {
    console.log("Error in getUnreadCounts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
