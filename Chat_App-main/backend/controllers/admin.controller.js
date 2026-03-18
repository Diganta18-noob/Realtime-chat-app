import { supabase } from "../config/supabase.js";
import { userSocketMap, io, getReceiverSocketId } from "../socket/socket.js";

export const getDashboardStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [{ count: totalUsers }, { count: messagesToday }] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', startOfToday.toISOString())
    ]);

    const onlineNow = Object.keys(userSocketMap).length;

    res.status(200).json({ totalUsers: totalUsers || 0, onlineNow, messagesToday: messagesToday || 0 });
  } catch (error) {
    console.log("Error in getDashboardStats:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, full_name, username, profile_pic, role, is_banned, banned_until, ban_reason, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const { data: latestLogins } = await supabase
      .from('audit_logs')
      .select('user_id, created_at')
      .in('action', ['LOGIN', 'ADMIN_LOGIN'])
      .order('created_at', { ascending: false });
    
    const loginMap = {};
    if(latestLogins) {
      latestLogins.forEach(l => {
        if(!loginMap[l.user_id]) loginMap[l.user_id] = l.created_at;
      });
    }

    const { data: latestLogouts } = await supabase
      .from('audit_logs')
      .select('user_id, created_at')
      .eq('action', 'LOGOUT')
      .order('created_at', { ascending: false });

    const logoutMap = {};
    if(latestLogouts) {
      latestLogouts.forEach(l => {
        if(!logoutMap[l.user_id]) logoutMap[l.user_id] = l.created_at;
      });
    }

    const usersWithStatus = users.map(user => {
      const uid = user.id;
      return {
        _id: uid,
        fullName: user.full_name,
        username: user.username,
        profilePic: user.profile_pic,
        role: user.role,
        isBanned: user.is_banned,
        bannedUntil: user.banned_until,
        banReason: user.ban_reason,
        createdAt: user.created_at,
        isOnline: !!userSocketMap[uid],
        lastLogin: loginMap[uid] || null,
        lastLogout: logoutMap[uid] || null,
      };
    });

    res.status(200).json(usersWithStatus);
  } catch(error) {
     console.log("Error in getAllUsers:", error.message);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const end = start + parseInt(limit) - 1;

    const { data: logs, count } = await supabase.from('audit_logs')
      .select('*, users (id, full_name, username, profile_pic)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end);

    const formattedLogs = (logs || []).map(log => ({
      _id: log.id,
      action: log.action,
      ipAddress: log.ip_address,
      userAgent: log.user_agent,
      details: log.details,
      createdAt: log.created_at,
      userId: log.users ? {
        _id: log.users.id,
        fullName: log.users.full_name,
        username: log.users.username,
        profilePic: log.users.profile_pic
      } : null
    }));

    res.status(200).json({
      logs: formattedLogs,
      total: count || 0,
      page: parseInt(page),
      totalPages: Math.ceil((count || 0) / parseInt(limit)),
    });
  } catch (error) {
    console.log("Error in getAuditLogs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleBanUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration = "permanent", reason = "" } = req.body || {};

    const { data: user, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error || !user) return res.status(404).json({ error: "User not found" });

    if (user.role === "admin") return res.status(400).json({ error: "Cannot ban an admin user" });

    let is_banned = user.is_banned;
    let banned_until = user.banned_until;
    let ban_reason = user.ban_reason;

    if (is_banned && duration === "unban") {
      is_banned = false;
      banned_until = null;
      ban_reason = "";
    } else if (!is_banned || duration !== "unban") {
      is_banned = true;
      ban_reason = reason;
      if (duration === "1h") {
        banned_until = new Date(Date.now() + 3600000).toISOString();
      } else if (duration === "24h") {
        banned_until = new Date(Date.now() + 86400000).toISOString();
      } else {
        banned_until = null;
      }
    }

    const { data: updatedUser } = await supabase.from('users').update({
      is_banned, banned_until, ban_reason
    }).eq('id', id).select().single();

    const durationLabel = is_banned ? (banned_until ? `until ${banned_until}` : "permanently") : "unbanned";

    await supabase.from('audit_logs').insert([{
      user_id: req.user.id || req.user._id,
      action: is_banned ? "USER_BANNED" : "USER_UNBANNED",
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      details: `User ${user.username} was ${is_banned ? "banned" : "unbanned"} ${durationLabel}${reason ? ` — Reason: ${reason}` : ""} - Target ID: ${id}`,
    }]);

    if (is_banned) {
      const socketId = getReceiverSocketId(id);
      if (socketId) {
        io.to(socketId).emit("banned", { message: "Your account has been restricted by an administrator." });
        setTimeout(() => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) socket.disconnect(true);
        }, 500);
      }
    }

    res.status(200).json({
      _id: updatedUser.id,
      fullName: updatedUser.full_name,
      username: updatedUser.username,
      isBanned: updatedUser.is_banned,
      bannedUntil: updatedUser.banned_until,
      banReason: updatedUser.ban_reason,
      message: `User ${is_banned ? "banned" : "unbanned"} successfully`,
    });
  } catch (error) {
    console.log("Error in toggleBanUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const exportAuditLogs = async (req,res) => { res.status(500).json({error: "Temporarily disabled during Supabase Rewrite."}); };
