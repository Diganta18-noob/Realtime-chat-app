import { supabase } from "../config/supabase.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const createGroup = async (req, res) => {
  try {
    const { groupName, participants } = req.body;
    const adminId = req.user.id || req.user._id;

    if (!groupName || !participants || participants.length === 0) {
      return res.status(400).json({ error: "Group name and participants are required" });
    }

    const allParticipants = [...new Set([...participants, adminId.toString()])];

    const { data: newGroup, error: groupError } = await supabase.from('conversations').insert({
      is_group: true,
      group_name: groupName,
      group_admin: adminId,
      group_avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(groupName)}&background=random`,
    }).select().single();

    if (groupError) throw groupError;

    const participantInserts = allParticipants.map(id => ({
      conversation_id: newGroup.id,
      user_id: id
    }));

    const { error: partError } = await supabase.from('conversation_participants').insert(participantInserts);
    if (partError) throw partError;

    // Fetch participants for frontend population
    const { data: populatedParts } = await supabase
      .from('users')
      .select('id, full_name, username, profile_pic, role, is_banned')
      .in('id', allParticipants);

    const formattedGroup = {
      _id: newGroup.id,
      isGroup: true,
      groupName: newGroup.group_name,
      groupAdmin: newGroup.group_admin,
      groupAvatar: newGroup.group_avatar,
      participants: populatedParts.map(p => ({ ...p, _id: p.id }))
    };

    allParticipants.forEach((userId) => {
      const socketId = getReceiverSocketId(userId);
      if (socketId) {
        io.to(socketId).emit("newGroupCreated", formattedGroup);
      }
    });

    res.status(201).json(formattedGroup);
  } catch (error) {
    console.log("Error in createGroup:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverOrGroupId } = req.params;
    const senderId = req.user.id || req.user._id;

    // 1. Resolve Conversation
    let conversation = null;
    let isGroup = false;
    let participants = [];

    // Is it a group?
    const { data: groupMatches } = await supabase.from('conversations').select('*').eq('id', receiverOrGroupId).maybeSingle();
    
    if (groupMatches && groupMatches.is_group) {
      conversation = groupMatches;
      isGroup = true;
      const { data: p } = await supabase.from('conversation_participants').select('user_id').eq('conversation_id', conversation.id);
      participants = p.map(x => x.user_id);
      
      // IDOR Mitigation: Check if the sender is actually a participant in the group
      if (!participants.includes(senderId)) {
        return res.status(403).json({ error: "Unauthorized: You are not a participant of this group." });
      }
    } else {
      // It's a DM, look for intersection
      const { data: p1 } = await supabase.from('conversation_participants').select('conversation_id').eq('user_id', senderId);
      const { data: p2 } = await supabase.from('conversation_participants').select('conversation_id').eq('user_id', receiverOrGroupId);
      
      const cIds1 = p1 ? p1.map(x => x.conversation_id) : [];
      const cIds2 = p2 ? p2.map(x => x.conversation_id) : [];
      const sharedIds = cIds1.filter(id => cIds2.includes(id));

      if (sharedIds.length > 0) {
        const { data: dms } = await supabase.from('conversations').select('*').in('id', sharedIds).eq('is_group', false);
        if (dms && dms.length > 0) conversation = dms[0];
      }

      if (!conversation) {
        // Create new DM
        const { data: newConv } = await supabase.from('conversations').insert({ is_group: false }).select().single();
        conversation = newConv;
        await supabase.from('conversation_participants').insert([
          { conversation_id: conversation.id, user_id: senderId },
          { conversation_id: conversation.id, user_id: receiverOrGroupId }
        ]);
        participants = [senderId, receiverOrGroupId];
      } else {
        participants = [senderId, receiverOrGroupId];
      }
    }

    const receiverOnline = !isGroup && getReceiverSocketId(receiverOrGroupId);

    // 2. Insert Message
    const { data: newMessage, error: msgError } = await supabase.from('messages').insert({
      sender_id: senderId,
      receiver_id: isGroup ? null : receiverOrGroupId,
      conversation_id: conversation.id,
      message,
      status: receiverOnline ? "delivered" : "sent"
    }).select().single();

    if (msgError) throw msgError;

    // 3. Insert read receipt
    await supabase.from('message_read_by').insert({
      message_id: newMessage.id,
      user_id: senderId
    });

    const mappedMessage = {
      _id: newMessage.id,
      senderId: newMessage.sender_id,
      receiverId: newMessage.receiver_id,
      conversationId: newMessage.conversation_id,
      message: newMessage.message,
      status: newMessage.status,
      createdAt: newMessage.created_at,
      updatedAt: newMessage.updated_at
    };

    // 4. Fire events
    if (isGroup) {
      participants.forEach((pid) => {
        if (pid !== senderId) {
          const socketId = getReceiverSocketId(pid);
          if (socketId) io.to(socketId).emit("newMessage", { ...mappedMessage });
        }
      });
    } else {
      const receiverSocketId = getReceiverSocketId(receiverOrGroupId);
      if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", mappedMessage);
    }

    res.status(201).json(mappedMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userOrGroupId } = req.params;
    const senderId = req.user.id || req.user._id;

    let conversationId = null;

    // Is it a group?
    const { data: groupMatches } = await supabase.from('conversations').select('id, is_group').eq('id', userOrGroupId).maybeSingle();
    
    if (groupMatches && groupMatches.is_group) {
      // IDOR Mitigation: Verify the requesting user is a participant of this group
      const { data: membership } = await supabase
        .from('conversation_participants')
        .select('user_id')
        .eq('conversation_id', groupMatches.id)
        .eq('user_id', senderId)
        .maybeSingle();

      if (!membership) {
        return res.status(403).json({ error: "Unauthorized: You do not have access to this group's messages." });
      }
      
      conversationId = groupMatches.id;
    } else {
      // Find DM
      const { data: p1 } = await supabase.from('conversation_participants').select('conversation_id').eq('user_id', senderId);
      const { data: p2 } = await supabase.from('conversation_participants').select('conversation_id').eq('user_id', userOrGroupId);
      
      const cIds1 = p1 ? p1.map(x => x.conversation_id) : [];
      const cIds2 = p2 ? p2.map(x => x.conversation_id) : [];
      const sharedIds = cIds1.filter(id => cIds2.includes(id));

      if (sharedIds.length > 0) {
        const { data: dms } = await supabase.from('conversations').select('id').in('id', sharedIds).eq('is_group', false);
        if (dms && dms.length > 0) conversationId = dms[0].id;
      }
    }

    if (!conversationId) return res.status(200).json([]);

    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    const formattedMessages = (messages || []).map(m => ({
      _id: m.id,
      senderId: m.sender_id,
      receiverId: m.receiver_id,
      conversationId: m.conversation_id,
      message: m.message,
      status: m.status,
      createdAt: m.created_at,
      updatedAt: m.updated_at
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("Error on getting message", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUnreadCounts = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // Fetch all messages targeting this user
    const { data: messages, error } = await supabase
      .from('messages')
      .select('id, sender_id')
      .eq('receiver_id', userId);

    if (error) throw error;
    if (!messages || messages.length === 0) return res.status(200).json({});

    const msgIds = messages.map(m => m.id);

    // Find which of these IDs the user has already read
    const { data: readLogs } = await supabase
      .from('message_read_by')
      .select('message_id')
      .eq('user_id', userId)
      .in('message_id', msgIds);

    const readIds = new Set(readLogs ? readLogs.map(log => log.message_id) : []);

    const counts = {};
    messages.forEach(m => {
      if (!readIds.has(m.id)) {
        if (!counts[m.sender_id]) counts[m.sender_id] = 0;
        counts[m.sender_id]++;
      }
    });

    res.status(200).json(counts);
  } catch (error) {
    console.log("Error in getUnreadCounts:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
