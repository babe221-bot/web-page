'use client';

import React from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const Chatbot: React.FC = () => {
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <>
      <Button onClick={toggleChatbot}>Chat</Button>
      <Sheet open={isOpen} onOpenChange={toggleChatbot}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chatbot</SheetTitle>
          </SheetHeader>
          {/* Chatbot conversation UI goes here */}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Chatbot;
