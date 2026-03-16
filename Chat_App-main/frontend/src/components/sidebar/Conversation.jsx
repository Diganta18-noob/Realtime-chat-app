import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-3 items-center rounded-lg px-3 py-2.5 mx-2 cursor-pointer transition-all duration-200
          ${isSelected ? "bg-primary/20 border border-primary/30" : "hover:bg-base-300/50"}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-11 rounded-full">
            <img src={conversation?.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-semibold text-base-content truncate text-sm">
            {conversation.fullName}
          </p>
          <p className={`text-xs ${isOnline ? "text-success" : "text-base-content/30"}`}>
            {isOnline ? (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success online-pulse inline-block"></span>
                Online
              </span>
            ) : (
              "Offline"
            )}
          </p>
        </div>
      </div>

      {!lastIdx && <div className="border-b border-base-300/30 mx-4 my-0.5" />}
    </>
  );
};
export default Conversation;
