import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = ({ searchQuery = "", unreadCounts = {} }) => {
  const { loading, conversations } = useGetConversations();

  const filtered = searchQuery
    ? conversations?.filter(
        (c) =>
          c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.username?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filtered?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === filtered.length - 1}
          unreadCount={unreadCounts[conversation._id] || 0}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {!loading && filtered?.length === 0 && searchQuery && (
        <p className="text-center text-base-content/40 text-sm py-4">
          No results found
        </p>
      )}
    </div>
  );
};
export default Conversations;
