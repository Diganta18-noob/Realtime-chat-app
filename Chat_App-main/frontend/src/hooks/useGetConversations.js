import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      // SWR: Only show loading spinner on first fetch (empty cache)
      const isFirstLoad = conversations.length === 0;
      if (isFirstLoad) setLoading(true);

      try {
        const res = await axiosInstance.get("/users");
        setConversations(res.data);
      } catch (error) {
        // Only toast on first load; silent failures for background refreshes
        if (isFirstLoad) {
          toast.error(error.response?.data?.error || error.message);
        }
      } finally {
        if (isFirstLoad) setLoading(false);
      }
    };

    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setConversations]);

  // Listen for newly created groups
  useEffect(() => {
    if (!socket) return;
    
    socket.on("newGroupCreated", (newGroup) => {
      // Format it for the sidebar exactly like the backend GET /api/users does
      const formattedGroup = {
        _id: newGroup._id,
        fullName: newGroup.groupName,
        username: "group",
        profilePic: newGroup.groupAvatar,
        isGroup: true,
        groupAdmin: newGroup.groupAdmin,
      };
      
      setConversations((prev) => [formattedGroup, ...prev]);
    });

    socket.on("groupDeleted", (groupId) => {
      setConversations((prev) => prev.filter((c) => c._id !== groupId));
    });

    // Listen for newly registered users so the sidebar updates without refresh
    socket.on("newUserJoined", (newUser) => {
      setConversations((prev) => {
        // Avoid duplicates — the user may already exist (e.g. Google OAuth user who just set username)
        const exists = prev.some((c) => c._id === newUser._id);
        if (exists) {
          // Update in case their username/profilePic changed (setUsername flow)
          return prev.map((c) => c._id === newUser._id ? { ...c, ...newUser } : c);
        }
        return [...prev, newUser];
      });
    });

    return () => {
      socket.off("newGroupCreated");
      socket.off("groupDeleted");
      socket.off("newUserJoined");
    };
  }, [socket, setConversations]);

  return { loading, conversations };
};
export default useGetConversations;

