import { supabase } from "../config/supabase.js";

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
        };
      });

    const combinedList = [...formattedGroups, ...filteredUsers];

    res.status(200).json(combinedList);
  } catch (error) {
    console.log("Error on getting users for sidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
