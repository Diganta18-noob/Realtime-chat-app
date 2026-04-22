import { memo, useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import Avatar from "../Avatar";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { Pencil, Check, X } from "lucide-react";

const MessageTick = ({ status }) => {
  if (status === "read") return <span className="message-tick message-tick-read">✓✓</span>;
  if (status === "delivered") return <span className="message-tick message-tick-delivered">✓✓</span>;
  return <span className="message-tick message-tick-sent">✓</span>;
};

const Message = memo(({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation, messages, setMessages } = useConversation();

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.message);
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef(null);

  // System messages (e.g., "User left the group")
  const isSystemMessage = !message.senderId || message.isSystemMessage;

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2 px-4">
        <div className="bg-base-300/60 backdrop-blur-sm text-base-content/60 text-xs px-4 py-1.5 rounded-full font-medium max-w-[80%] text-center">
          {message.message}
        </div>
      </div>
    );
  }

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-primary text-primary-content" : "bg-base-300 text-base-content";
  const shakeClass = message.shouldShake ? "shake" : "";

  let avatarUsername = "";
  let avatarRole = "";
  let avatarPic = "";

  if (fromMe) {
    avatarUsername = authUser.username;
    avatarRole = authUser.role;
    avatarPic = authUser.profilePic;
  } else if (selectedConversation?.isGroup) {
    const sender = selectedConversation.participants?.find(p => p._id === message.senderId);
    avatarUsername = sender?.username || sender?.fullName || "Group Member";
    avatarRole = sender?.role || "user";
    avatarPic = sender?.profilePic || "";
  } else {
    avatarUsername = selectedConversation?.username || selectedConversation?.fullName;
    avatarRole = selectedConversation?.role;
    avatarPic = selectedConversation?.profilePic;
  }

  const startEditing = () => {
    setEditText(message.message);
    setIsEditing(true);
    setTimeout(() => editInputRef.current?.focus(), 50);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditText(message.message);
  };

  const handleSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed || trimmed === message.message) {
      cancelEditing();
      return;
    }

    setEditLoading(true);
    try {
      const res = await axiosInstance.put(`/messages/${message._id}/edit`, { message: trimmed });
      // Update local state
      const updatedMessages = messages.map((m) =>
        m._id === message._id ? { ...m, message: res.data.message, isEdited: true } : m
      );
      setMessages(updatedMessages);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to edit message");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  return (
    <div className={`chat ${chatClassName} group/msg`}>
      <div className="chat-image">
        <Avatar username={avatarUsername} role={avatarRole} profilePic={avatarPic} size={32} />
      </div>
      {selectedConversation?.isGroup && !fromMe && (
        <div className="chat-header text-xs opacity-50 mb-1 ml-1 flex gap-1 items-center">
          {avatarRole === 'admin' && (
            <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Admin
            </span>
          )}
          {avatarUsername}
        </div>
      )}
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-sm relative`}>
        {isEditing ? (
          <div className="flex items-center gap-1.5 min-w-[120px]">
            <input
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleEditKeyDown}
              disabled={editLoading}
              className="bg-transparent border-b border-current/30 outline-none text-sm w-full py-0.5 placeholder:opacity-50"
              placeholder="Edit message..."
            />
            <button
              onClick={handleSaveEdit}
              disabled={editLoading}
              className="p-0.5 hover:opacity-80 transition-opacity"
              title="Save"
            >
              {editLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={cancelEditing}
              disabled={editLoading}
              className="p-0.5 hover:opacity-80 transition-opacity"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            {message.message}
            {fromMe && !isEditing && (
              <button
                onClick={startEditing}
                className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover/msg:opacity-60 hover:!opacity-100 transition-opacity p-1 rounded-full bg-base-300/80"
                title="Edit message"
              >
                <Pencil className="w-3 h-3 text-base-content" />
              </button>
            )}
          </>
        )}
      </div>
      <div className="chat-footer text-[10px] text-base-content/40 mt-0.5 flex items-center gap-1">
        {formattedTime}
        {message.isEdited && (
          <span className="italic opacity-70">(edited)</span>
        )}
        {fromMe && <MessageTick status={message.status || "sent"} />}
      </div>
    </div>
  );
});

Message.displayName = "Message";

export default Message;
