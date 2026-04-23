import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import useConversation from "../zustand/useConversation";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation, setConversations } = useConversation();

  const createGroup = async (groupName, participants) => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return false;
    }
    if (participants.length < 2) {
      toast.error("Select at least 2 users for a group");
      return false;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/messages/group", { groupName, participants });
      const data = res.data;

      toast.success("Group created successfully!");
      
      const formattedGroup = {
        ...data,
        fullName: data.groupName,
        profilePic: data.groupAvatar,
      };

      // Add the new group to the sidebar conversations list
      setConversations((prev) => {
        const exists = prev.some((c) => c._id === formattedGroup._id);
        if (exists) return prev;
        return [formattedGroup, ...prev];
      });

      setSelectedConversation(formattedGroup);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading };
};

export default useCreateGroup;

