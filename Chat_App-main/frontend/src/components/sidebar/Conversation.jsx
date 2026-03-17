import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import Avatar from "../Avatar";

const Conversation = ({ conversation, lastIdx, unreadCount = 0 }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  
  // For groups, we don't show a single online status
  const isOnline = !conversation.isGroup && onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-3 items-center rounded-lg px-3 py-2.5 mx-2 cursor-pointer transition-all duration-200
          ${isSelected ? "bg-primary/20 border border-primary/30" : "hover:bg-base-300/50"}
        `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div style={{ position: "relative" }}>
          <Avatar
            username={conversation.username || conversation.fullName}
            role={conversation.role}
            size={44}
            isOnline={conversation.isGroup ? undefined : isOnline}
          />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute", top: -4, right: -4,
              background: "#7c3aed", color: "white",
              borderRadius: "50%", fontSize: 11,
              minWidth: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, border: "2px solid #0f0f1a",
              zIndex: 10,
            }}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-semibold text-base-content truncate text-sm">
            {conversation.fullName}
          </p>
          <p className={`text-xs ${isOnline ? "text-success" : conversation.isGroup ? "text-primary font-medium" : "text-base-content/30"}`}>
            {conversation.isGroup ? (
              "Group"
            ) : isOnline ? (
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
