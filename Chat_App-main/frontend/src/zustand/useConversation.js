import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  conversations: [],
  setConversations: (updater) => set((state) => ({ 
    conversations: typeof updater === "function" ? updater(state.conversations) : updater 
  })),
}));

export default useConversation;
