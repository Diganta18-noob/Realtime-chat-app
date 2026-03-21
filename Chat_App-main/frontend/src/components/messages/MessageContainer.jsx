import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { HiArrowLeft } from "react-icons/hi";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import Avatar from "../Avatar";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const MessageContainer = ({ resetUnreadCount }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();

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

  const handleLeaveGroup = async () => {
    if (!window.confirm("Are you sure you want to leave this group?")) return;
    try {
      await axiosInstance.delete(`/messages/group/${selectedConversation._id}/leave`);
      toast.success("Left group successfully");
      setSelectedConversation(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to leave group");
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await axiosInstance.delete(`/messages/group/${selectedConversation._id}`);
      toast.success("Group deleted successfully");
      setSelectedConversation(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete group");
    }
  };

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
            
            {selectedConversation.isGroup && (
              <div className="flex-none">
                {authUser?._id === selectedConversation.groupAdmin ? (
                  <button onClick={handleDeleteGroup} className="btn btn-error btn-sm rounded-full bg-error/10 text-error border-none hover:bg-error hover:text-white transition-colors uppercase text-xs font-bold tracking-wide">
                    Delete Group
                  </button>
                ) : (
                  <button onClick={handleLeaveGroup} className="btn btn-warning btn-sm rounded-full bg-warning/10 text-warning border-none hover:bg-warning hover:text-white transition-colors uppercase text-xs font-bold tracking-wide">
                    Leave Group
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Messages */}
          <Messages />

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
