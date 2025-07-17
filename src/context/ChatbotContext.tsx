'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatbotContextType {
  isChatOpen: boolean;
  setChatOpen: (isOpen: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);

  const value = {
    isChatOpen,
    setChatOpen,
  };

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
};
