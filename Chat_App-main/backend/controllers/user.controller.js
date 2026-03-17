import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    // Fetch all other users
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password").lean();

    // Fetch all group conversations the user is a part of
    const userGroups = await Conversation.find({
      isGroup: true,
      participants: loggedInUser,
    }).lean();

    // Format groups to match user object structure for the frontend
    const formattedGroups = userGroups.map((group) => ({
      _id: group._id, // This is the conversation ID
      fullName: group.groupName, // Treat group name as full name for UI
      username: "group", // Dummy username
      profilePic: group.groupAvatar,
      isGroup: true, // Flag for the frontend to know how to route messages
      groupAdmin: group.groupAdmin,
    }));

    // Combine both arrays
    const combinedList = [...formattedGroups, ...filteredUsers];

    res.status(200).json(combinedList);
  } catch (error) {
    console.log("Error on getting users for sidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
