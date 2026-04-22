import { supabase } from "../config/supabase.js";
import logger from "../utils/logger.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user.id || req.user._id;

    const loggedInRole = req.user.role;

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, full_name, username, profile_pic, role')
      .neq('id', loggedInUser)
      .or('is_deleted.eq.false,is_deleted.is.null');

    if (usersError) throw usersError;

    let visibleUsers = users;
    if (loggedInRole !== 'admin') {
      visibleUsers = visibleUsers.filter(u => u.role !== 'admin' || u.username === 'admin');
    }

    const filteredUsers = visibleUsers.map(u => ({
      _id: u.id,
      fullName: u.full_name,
      username: u.username,
      profilePic: u.profile_pic,
    }));

    const { data: userGroups, error: groupsError } = await supabase
      .from('conversation_participants')
      .select(`
        conversation_id,
        conversations:conversation_id (
          id, is_group, group_name, group_avatar, group_admin
        )
      `)
      .eq('user_id', loggedInUser);

    if (groupsError) throw groupsError;

    const formattedGroups = (userGroups || [])
      .filter(cp => cp.conversations && cp.conversations.is_group)
      .map(cp => {
        const group = cp.conversations;
        return {
          _id: group.id,
          fullName: group.group_name,
          username: "group",
          profilePic: group.group_avatar,
          isGroup: true,
          groupAdmin: group.group_admin,
          participants: []
        };
      });

    const groupIds = formattedGroups.map(g => g._id);
    if (groupIds.length > 0) {
      const { data: groupParticipants, error: gpError } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          users:user_id ( id, full_name, username, profile_pic, role )
        `)
        .in('conversation_id', groupIds);

      if (!gpError && groupParticipants) {
         formattedGroups.forEach(group => {
           const parts = groupParticipants.filter(gp => gp.conversation_id === group._id && gp.users);
           group.participants = parts.map(p => ({
             _id: p.users.id,
             fullName: p.users.full_name,
             username: p.users.username,
             profilePic: p.users.profile_pic,
             role: p.users.role
           }));
         });
      }
    }

    const combinedList = [...formattedGroups, ...filteredUsers];

    res.status(200).json(combinedList);
  } catch (error) {
    console.log("Error on getting users for sidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, username, email, profile_pic, gender, role, is_email_verified, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user.id,
      fullName: user.full_name,
      username: user.username,
      email: user.email,
      profilePic: user.profile_pic,
      gender: user.gender,
      role: user.role,
      isEmailVerified: user.is_email_verified,
      createdAt: user.created_at,
    });
  } catch (error) {
    logger.error("Error in getProfile:", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: "Image data is required" });
    }

    // imageData is expected to be a base64 data URI like "data:image/png;base64,..."
    const matches = imageData.match(/^data:image\/(png|jpeg|jpg|gif|webp);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: "Invalid image format. Please upload a PNG, JPEG, GIF, or WebP image." });
    }

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Max 2MB
    if (buffer.length > 2 * 1024 * 1024) {
      return res.status(400).json({ error: "Image size must be under 2MB" });
    }

    const fileName = `avatars/${userId}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, buffer, {
        contentType: `image/${matches[1]}`,
        upsert: true,
      });

    if (uploadError) {
      logger.error("Supabase storage upload error", { error: uploadError.message });
      return res.status(500).json({ error: "Failed to upload image" });
    }

    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    const newProfilePic = publicUrlData.publicUrl;

    const { error: updateError } = await supabase
      .from('users')
      .update({ profile_pic: newProfilePic })
      .eq('id', userId);

    if (updateError) throw updateError;

    res.status(200).json({ profilePic: newProfilePic });
  } catch (error) {
    logger.error("Error in updateProfileImage:", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};
