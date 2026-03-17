import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, refreshAccessToken } = useAuthContext();
  const { setSelectedConversation } = useConversation();

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
      let token = accessToken;
      let res = await fetch("/api/messages/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ groupName, participants }),
      });

      if (res.status === 401) {
        token = await refreshAccessToken();
        if (!token) return false;
        res = await fetch("/api/messages/group", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ groupName, participants }),
        });
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success("Group created successfully!");
      // Optionally format it slightly if backend didn't do it before selecting
      const formattedGroup = {
        ...data,
        fullName: data.groupName,
        profilePic: data.groupAvatar,
      };
      setSelectedConversation(formattedGroup);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading };
};

export default useCreateGroup;
