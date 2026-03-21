import { memo } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import Avatar from "../Avatar";

const MessageTick = ({ status }) => {
  if (status === "read") return <span className="message-tick message-tick-read">✓✓</span>;
  if (status === "delivered") return <span className="message-tick message-tick-delivered">✓✓</span>;
  return <span className="message-tick message-tick-sent">✓</span>;
};

const Message = memo(({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
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

  return (
    <div className={`chat ${chatClassName}`}>
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
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-sm`}>
        {message.message}
      </div>
      <div className="chat-footer text-[10px] text-base-content/40 mt-0.5 flex items-center gap-1">
        {formattedTime}
        {fromMe && <MessageTick status={message.status || "sent"} />}
      </div>
    </div>
  );
});

Message.displayName = "Message";

export default Message;
