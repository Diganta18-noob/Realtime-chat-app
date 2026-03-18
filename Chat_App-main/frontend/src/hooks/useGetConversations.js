import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useSocketContext } from "../context/SocketContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { socket } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/users");
        setConversations(res.data);
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

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

    return () => socket.off("newGroupCreated");
  }, [socket]);

  return { loading, conversations };
};
export default useGetConversations;
