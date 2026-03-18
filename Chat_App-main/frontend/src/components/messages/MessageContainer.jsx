import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { HiArrowLeft } from "react-icons/hi";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import Avatar from "../Avatar";

const MessageContainer = ({ resetUnreadCount, incrementUnreadCount }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = selectedConversation
    ? !selectedConversation.isGroup && onlineUsers.includes(selectedConversation._id)
    : false;

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // Mark messages as read when opening a chat
  useEffect(() => {
    if (selectedConversation && resetUnreadCount) {
      resetUnreadCount(selectedConversation._id);
    }
  }, [selectedConversation?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Chat Header */}
          <div className="bg-base-200 px-4 py-3 flex items-center gap-3 border-b border-base-300">
            {/* Back button for mobile */}
            <button
              className="md:hidden btn btn-ghost btn-sm btn-circle"
              onClick={() => setSelectedConversation(null)}
            >
              <HiArrowLeft className="text-lg" />
            </button>
            <Avatar
              username={selectedConversation.username || selectedConversation.fullName}
              role={selectedConversation.role}
              profilePic={selectedConversation.profilePic}
              size={40}
              isOnline={selectedConversation.isGroup ? undefined : isOnline}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base-content truncate">
                {selectedConversation.fullName}
              </p>
              <p className={`text-xs ${isOnline ? "text-success" : selectedConversation.isGroup ? "text-primary font-medium" : "text-base-content/40"}`}>
                {selectedConversation.isGroup ? (
                   "Group"
                ) : isOnline ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success online-pulse inline-block"></span>
                    Online
                  </span>
                ) : (
                  "Offline"
                )}
              </p>
            </div>
          </div>

          {/* Messages */}
          <Messages incrementUnreadCount={incrementUnreadCount} />

          {/* Input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center flex flex-col items-center gap-3 animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <TiMessages className="text-3xl text-primary" />
        </div>
        <p className="text-xl font-semibold text-base-content">
          Welcome, {authUser?.fullName} 👋
        </p>
        <p className="text-base-content/50 text-sm">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};
