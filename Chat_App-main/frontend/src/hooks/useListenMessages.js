import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = (incrementUnreadCount) => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Check if this message is for the currently open chat
      const isActiveChat =
        selectedConversation &&
        (newMessage.senderId === selectedConversation._id ||
          newMessage.conversationId === selectedConversation._id);

      if (isActiveChat) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      } else if (incrementUnreadCount) {
        // Not the active chat — increment unread badge
        const senderId = newMessage.senderId;
        if (senderId) incrementUnreadCount(senderId);
      }

      const sound = new Audio(notificationSound);
      sound.play();
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation, incrementUnreadCount]);
};
export default useListenMessages;
