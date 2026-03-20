import { useMemo } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import ConversationSkeleton from "../skeletons/ConversationSkeleton";

const Conversations = ({ searchQuery = "", unreadCounts = {} }) => {
  const { loading, conversations } = useGetConversations();

  const filtered = useMemo(() => {
    return searchQuery
      ? conversations?.filter(
          (c) =>
            c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.username?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : conversations;
  }, [conversations, searchQuery]);

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
        [...Array(6)].map((_, idx) => <ConversationSkeleton key={idx} />)
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
