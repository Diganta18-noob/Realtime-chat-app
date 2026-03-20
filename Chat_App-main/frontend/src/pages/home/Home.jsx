import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";
import useUnreadCounts from "../../hooks/useUnreadCounts";
import useListenMessages from "../../hooks/useListenMessages";

const Home = () => {
  const { selectedConversation } = useConversation();
  const { unreadCounts, incrementCount, resetCount } = useUnreadCounts();

  // Always listen for incoming messages — even when no chat is selected
  useListenMessages(incrementCount);

  return (
    <div className="flex w-full h-[100dvh] sm:h-[85vh] sm:max-w-5xl sm:mx-auto overflow-hidden glass-card sm:my-4">
      {/* On mobile: show sidebar when no conversation selected, show messages when selected */}
      <div
        className={`${
          selectedConversation ? "hidden" : "flex"
        } md:flex w-full md:w-80 flex-shrink-0 flex-col`}
      >
        <Sidebar unreadCounts={unreadCounts} />
      </div>
      <div
        className={`${
          selectedConversation ? "flex" : "hidden"
        } md:flex flex-1 flex-col min-w-0`}
      >
        <MessageContainer
          resetUnreadCount={resetCount}
        />
      </div>
    </div>
  );
};

export default Home;
