/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuthContext } from "./AuthContext";
import useConversation from "../zustand/useConversation";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser, accessToken, setAuthUser, setAccessToken } = useAuthContext();
  const tokenRef = useRef(accessToken);

  // Keep the ref in sync so reconnections use the latest token
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    if (authUser && accessToken) {
      // WebSockets MUST connect directly to the backend — Vercel does NOT proxy WebSockets.
      // In production (non-localhost), always connect to the Render backend URL.
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const socketUrl = import.meta.env.VITE_BACKEND_URL
        || (isLocalhost ? "/" : "https://orbit-chat.onrender.com");
      const newSocket = io(socketUrl, {
        auth: {
          token: accessToken,
        },
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("banned", (data) => {
        import("react-hot-toast").then((module) => {
          module.default.error(data.message || "You have been banned.", { duration: 5000 });
        });
        setAuthUser(null);
        setAccessToken(null);
      });

      // Read receipt: messages delivered to recipient
      newSocket.on("messages_delivered", ({ messageIds }) => {
        const { messages, setMessages } = useConversation.getState();
        const updated = messages.map((m) =>
          messageIds.includes(m._id) ? { ...m, status: "delivered" } : m
        );
        if (updated.some((m, i) => m !== messages[i])) {
          setMessages(updated);
        }
      });

      // Read receipt: messages seen/read by recipient  
      newSocket.on("messages_seen", ({ messageIds }) => {
        const { messages, setMessages } = useConversation.getState();
        const updated = messages.map((m) =>
          messageIds.includes(m._id) ? { ...m, status: "read" } : m
        );
        if (updated.some((m, i) => m !== messages[i])) {
          setMessages(updated);
        }
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // Only re-run when authUser changes (login/logout), NOT on every token refresh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
