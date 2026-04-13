import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import useConversation from "../../zustand/useConversation";
import useUnreadCounts from "../../hooks/useUnreadCounts";
import useListenMessages from "../../hooks/useListenMessages";
import { motion } from "framer-motion";

const Home = () => {
  const { selectedConversation } = useConversation();
  const { unreadCounts, incrementCount, resetCount } = useUnreadCounts();

  // Always listen for incoming messages — even when no chat is selected
  useListenMessages(incrementCount);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full h-[100dvh] sm:h-[85vh] sm:max-w-6xl sm:mx-auto overflow-hidden glass-card sm:my-4 shadow-2xl shadow-black/50 ring-1 ring-white/5"
    >
      {/* On mobile: show sidebar when no conversation selected, show messages when selected */}
      <div
        className={`${
          selectedConversation ? "hidden" : "flex"
        } md:flex w-full md:w-[320px] lg:w-[380px] flex-shrink-0 flex-col bg-base-300/30 border-r border-white/5`}
      >
        <Sidebar unreadCounts={unreadCounts} />
      </div>
      <div
        className={`${
          selectedConversation ? "flex" : "hidden"
        } md:flex flex-1 flex-col min-w-0 bg-base-100/40 relative backdrop-blur-sm`}
      >
        <MessageContainer
          resetUnreadCount={resetCount}
        />
      </div>
    </motion.div>
  );
};

export default Home;
