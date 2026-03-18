import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import Avatar from "../Avatar";

const MessageTick = ({ status }) => {
  if (status === "read") return <span style={{ color: "#60a5fa", fontSize: 12 }}>✓✓</span>;
  if (status === "delivered") return <span style={{ color: "#9ca3af", fontSize: 12 }}>✓✓</span>;
  return <span style={{ color: "#6b7280", fontSize: 12 }}>✓</span>;
};

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-primary text-primary-content" : "bg-base-300 text-base-content";
  const shakeClass = message.shouldShake ? "shake" : "";

  const avatarUsername = fromMe
    ? authUser.username
    : selectedConversation?.username || selectedConversation?.fullName;
  const avatarRole = fromMe ? authUser.role : selectedConversation?.role;
  const avatarPic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image">
        <Avatar username={avatarUsername} role={avatarRole} profilePic={avatarPic} size={32} />
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-sm`}>
        {message.message}
      </div>
      <div className="chat-footer text-[10px] text-base-content/40 mt-0.5 flex items-center gap-1">
        {formattedTime}
        {fromMe && <MessageTick status={message.status || "sent"} />}
      </div>
    </div>
  );
};
export default Message;
