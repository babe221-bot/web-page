"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat-flow";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Zdravo! Ja sam DaorsChatBot. Postavite mi pitanje o našim uslugama.",
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
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const botResponse = await chat({
        history: history,
        message: input,
      });
      
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

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl z-50 transition-transform hover:scale-110"
        onClick={() => setIsOpen(true)}
        aria-label="Otvori chatbot"
      >
        <Bot className="h-8 w-8" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full md:max-w-md bg-background/90 backdrop-blur-xl border-l-white/10 p-0 flex flex-col"
        >
          <SheetHeader className="p-4 border-b border-white/10">
            <SheetTitle className="flex items-center gap-2 font-headline text-lg gradient-text">
              <Bot />
              DaorsChatBot
            </SheetTitle>
            <SheetDescription className="sr-only">
              Prozor za razgovor sa AI asistentom
            </SheetDescription>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-2"
                aria-label="Zatvori chat"
            >
                <X className="h-6 w-6" />
            </Button>
          </SheetHeader>

          <ScrollArea className="flex-1" ref={scrollAreaRef}>
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
                      <Bot className="h-5 w-5 text-background" />
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
                    {message.content}
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
                      <Bot className="h-5 w-5 text-background" />
                    </div>
                    <div className="p-3 rounded-lg bg-white/10 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span>Mislim...</span>
                    </div>
                </div>
                )}
            </div>
          </ScrollArea>
          
          <SheetFooter className="p-4 border-t border-white/10">
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
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
