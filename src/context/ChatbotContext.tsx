'use client';

import React, 'react';
import { createContext, useContext, useState } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  toggleChatbot: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};
