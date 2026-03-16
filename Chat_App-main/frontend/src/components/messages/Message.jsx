import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-primary text-primary-content" : "bg-base-300 text-base-content";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img alt="avatar" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-sm`}>
        {message.message}
      </div>
      <div className="chat-footer text-[10px] text-base-content/40 mt-0.5">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
