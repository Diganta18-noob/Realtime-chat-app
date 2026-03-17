import User from "../models/user.model.js";
import AuditLog from "../models/auditLog.model.js";
import { userSocketMap, io, getReceiverSocketId } from "../socket/socket.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    // Fetch the most recent LOGIN and LOGOUT timestamps per user
    const userIds = users.map((u) => u._id);

    const [lastLogins, lastLogouts] = await Promise.all([
      AuditLog.aggregate([
        { $match: { userId: { $in: userIds }, action: { $in: ["LOGIN", "ADMIN_LOGIN"] } } },
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$userId", lastLogin: { $first: "$createdAt" } } },
      ]),
      AuditLog.aggregate([
        { $match: { userId: { $in: userIds }, action: "LOGOUT" } },
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$userId", lastLogout: { $first: "$createdAt" } } },
      ]),
    ]);

    const loginMap = Object.fromEntries(lastLogins.map((l) => [l._id.toString(), l.lastLogin]));
    const logoutMap = Object.fromEntries(lastLogouts.map((l) => [l._id.toString(), l.lastLogout]));

    // Attach online status and timing info
    const usersWithStatus = users.map((user) => {
      const uid = user._id.toString();
      return {
        ...user.toObject(),
        isOnline: !!userSocketMap[uid],
        lastLogin: loginMap[uid] || null,
        lastLogout: logoutMap[uid] || null,
      };
    });

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.log("Error in getAllUsers controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const { userId, action, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (action) filter.action = action;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate("userId", "fullName username profilePic")
        .populate("targetUserId", "fullName username profilePic")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      AuditLog.countDocuments(filter),
    ]);

    res.status(200).json({
      logs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.log("Error in getAuditLogs controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleBanUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent banning other admins
    if (user.role === "admin") {
      return res.status(400).json({ error: "Cannot ban an admin user" });
    }

    // Toggle ban status
    user.isBanned = !user.isBanned;
    await user.save();

    // Log the action
    await AuditLog.create({
      userId: req.user._id,
      action: user.isBanned ? "USER_BANNED" : "USER_UNBANNED",
      targetUserId: user._id,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      details: `User ${user.username} was ${user.isBanned ? "banned" : "unbanned"}`,
    });

    // If the user is now banned and online, notify and disconnect them
    if (user.isBanned) {
      const socketId = getReceiverSocketId(user._id.toString());
      if (socketId) {
        io.to(socketId).emit("banned", {
          message: "Your account has been restricted by an administrator.",
        });
        // Disconnect after a short delay so the event is received
        setTimeout(() => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) socket.disconnect(true);
        }, 500);
      }
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      isBanned: user.isBanned,
      message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`,
    });
  } catch (error) {
    console.log("Error in toggleBanUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
