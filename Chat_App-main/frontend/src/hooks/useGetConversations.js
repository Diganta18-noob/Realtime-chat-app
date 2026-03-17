import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { accessToken, refreshAccessToken } = useAuthContext();
  const { socket } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        let token = accessToken;
        let res = await fetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If 401, try refreshing the token
        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch("/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) getConversations();
  }, [accessToken, refreshAccessToken]);

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
