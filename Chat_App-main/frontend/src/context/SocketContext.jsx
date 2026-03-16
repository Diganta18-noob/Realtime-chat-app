import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser, accessToken, setAuthUser, setAccessToken } = useAuthContext();

  useEffect(() => {
    if (authUser && accessToken) {
      const newSocket = io("/", {
        auth: {
          token: accessToken,
        },
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
        localStorage.removeItem("chat-user");
      });

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, accessToken]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
