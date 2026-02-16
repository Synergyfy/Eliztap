import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatState {
  history: Message[];
  addMessage: (message: Omit<Message, 'timestamp'>) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      history: [],
      addMessage: (message) => set((state) => ({
        history: [...state.history, { ...message, timestamp: Date.now() }]
      })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'chat-history',
    }
  )
);
