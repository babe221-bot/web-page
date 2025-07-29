"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat, ChatInput } from "@/ai/flows/chat-flow";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface ChartData {
  [key: string]: string | number;
}

interface Message {
  role: "user" | "model";
  content?: string;
  chart?: {
    chartType: 'bar' | 'line' | 'pie';
    data: ChartData[];
  };
}

const initialBotMessage = "Zdravo! Ja sam DaorsChatBot. Postavite mi pitanje o našim uslugama.";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: initialBotMessage,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.content !== initialBotMessage)
        .map(m => ({
          role: m.role,
          content: m.content || ''
      }));

      const chatInput: ChatInput = {
        history: history,
        message: input,
      };

      const botResponse = await chat(chatInput);
      
      const botMessage: Message = { role: 'model', content: botResponse };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        role: "model",
        content: "Izvinite, došlo je do greške. Molimo pokušajte ponovo kasnije.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderChart = (message: Message) => {
    // Chart functionality is disabled with Perplexity API integration for now
    return null;
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl z-50 transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Otvori chatbot"
      >
        <Image src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589" alt="Chatbot" width={40} height={40} className="rounded-full object-cover" unoptimized />
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full md:max-w-md bg-background/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl flex flex-col z-50">
          <header className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="flex items-center gap-2 font-headline text-lg gradient-text">
              <Image src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589" alt="Chatbot" width={24} height={24} className="rounded-full object-cover" unoptimized />
              DaorsChatBot
            </h2>
          </header>

          <ScrollArea className="flex-1 h-96" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "model" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Image src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589" alt="Chatbot" width={24} height={24} className="rounded-full object-cover" unoptimized />
                    </div>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-sm text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/10"
                    )}
                  >
                    {message.content && <div>{message.content}</div>}
                    {renderChart(message)}
                  </div>
                   {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-foreground" />
                    </div>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Image src="https://firebasestorage.googleapis.com/v0/b/website-5a18c.firebasestorage.app/o/generated-image%20(6).png?alt=media&token=5db267db-a5ee-482e-8fea-b7cbeb1a3589" alt="Chatbot" width={24} height={24} className="rounded-full object-cover" unoptimized />
                    </div>
                    <div className="p-3 rounded-lg bg-white/10 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span>Mislim...</span>
                    </div>
                </div>
                )}
            </div>
          </ScrollArea>
          
          <footer className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Postavite pitanje..."
                aria-label="Unesite poruku"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Pošalji</span>
              </Button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}
