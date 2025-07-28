'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useChatbot } from '@/context/ChatbotContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Bot, Send, User, X } from 'lucide-react';
import { chat, ChatInput } from '@/ai/flows/chat-flow';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const { isChatOpen, setChatOpen } = useChatbot();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      setMessages([
        {
          role: 'model',
          content: 'Zdravo! Ja sam DaorsChatBot. Postavite mi pitanje o našim uslugama.',
        },
      ]);
    }
  }, [isChatOpen, messages.length]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // The radix scrollarea component doesn't expose a ref to the viewport directly.
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
  
    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    try {
      const chatInput: ChatInput = {
        history: newMessages.slice(0, -1),
        message: input,
      };
      const response = await chat(chatInput);
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Izvinite, došlo je do greške. Molimo pokušajte ponovo kasnije.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isChatOpen} onOpenChange={setChatOpen}>
      <SheetContent className="w-full md:max-w-md bg-background/90 backdrop-blur-xl border-l-white/10 p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-white/10">
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589"
                    alt="DaorsForge AI Systems Logo"
                    width={32}
                    height={32}
                    style={{ height: "auto" }}
                    unoptimized
                />
                <SheetTitle className="text-lg font-bold font-headline gradient-text">DaorsChatBot</SheetTitle>
             </div>
             <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Zatvori chat</span>
            </Button>
           </div>
           <SheetDescription className="sr-only">Prozor za razgovor sa AI asistentom</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    'rounded-lg px-4 py-2 max-w-[80%] text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground/90'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
             {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted text-foreground/90">
                       <div className="flex items-center gap-1.5">
                           <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-0"></span>
                           <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-150"></span>
                           <span className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse delay-300"></span>
                       </div>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Postavite pitanje..."
              autoComplete="off"
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="w-5 h-5" />
              <span className="sr-only">Pošalji</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
