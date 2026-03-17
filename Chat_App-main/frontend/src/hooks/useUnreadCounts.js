import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

const useUnreadCounts = () => {
  const [unreadCounts, setUnreadCounts] = useState({});
  const { accessToken, refreshAccessToken, authUser } = useAuthContext();
  const { socket } = useSocketContext();

  // Fetch initial unread counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        let token = accessToken;
        let res = await fetch("/api/messages/unread-counts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          token = await refreshAccessToken();
          if (!token) return;
          res = await fetch("/api/messages/unread-counts", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        const data = await res.json();
        if (!data.error) {
          setUnreadCounts(data);
        }
      } catch (error) {
        console.log("Error fetching unread counts:", error);
      }
    };

    if (accessToken) fetchCounts();
  }, [accessToken, refreshAccessToken]);

  // Increment count when new message arrives (called from outside)
  const incrementCount = useCallback((senderId) => {
    setUnreadCounts((prev) => ({
      ...prev,
      [senderId]: (prev[senderId] || 0) + 1,
    }));
  }, []);

  // Reset count when user opens a chat
  const resetCount = useCallback(
    (conversationId) => {
      setUnreadCounts((prev) => {
        const next = { ...prev };
        delete next[conversationId];
        return next;
      });

      // Emit messages_read to backend
      if (socket && authUser) {
        socket.emit("messages_read", {
          senderId: conversationId,
          receiverId: authUser._id,
        });
      }
    },
    [socket, authUser]
  );

  return { unreadCounts, incrementCount, resetCount };
};

export default useUnreadCounts;
