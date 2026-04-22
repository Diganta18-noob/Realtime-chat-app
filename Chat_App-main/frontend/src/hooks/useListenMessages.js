import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = (incrementUnreadCount) => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      // Check if this message is for the currently open chat
      const isActiveChat =
        selectedConversation &&
        (newMessage.senderId === selectedConversation._id ||
          newMessage.conversationId === selectedConversation._id);

      if (isActiveChat) {
        newMessage.shouldShake = true;
        const { messages: currentMessages, setMessages } = useConversation.getState();
        setMessages([...currentMessages, newMessage]);
      } else if (incrementUnreadCount) {
        // Not the active chat — increment unread badge
        const senderId = newMessage.senderId;
        if (senderId) incrementUnreadCount(senderId);
      }

      const sound = new Audio(notificationSound);
      sound.play();
    });

    socket?.on("messageEdited", (editedMessage) => {
      const { messages: currentMessages, setMessages } = useConversation.getState();
      const updatedMessages = currentMessages.map((msg) =>
        msg._id === editedMessage._id
          ? { ...msg, message: editedMessage.message, isEdited: true }
          : msg
      );
      setMessages(updatedMessages);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("messageEdited");
    };
  }, [socket, selectedConversation, incrementUnreadCount]);
};
export default useListenMessages;
