"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat-flow";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface Message {
  role: "user" | "model";
  content?: string;
  chart?: {
    chartType: 'bar' | 'line' | 'pie';
    data: any[];
  };
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
        content: m.content || ''
      }));

      const botResponse = await chat({
        history: history,
        message: input,
      });

      if (typeof botResponse === 'string') {
        const botMessage: Message = { role: 'model', content: botResponse };
        setMessages((prev) => [...prev, botMessage]);
      } else if (botResponse.chart) {
        const botMessage: Message = { role: 'model', chart: botResponse.chart };
        setMessages((prev) => [...prev, botMessage]);
      }

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
    if (!message.chart) return null;

    const { chartType, data } = message.chart;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    switch (chartType) {
      case 'bar':
        return (
          <ChartContainer config={{}} className="min-h-[200px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
            </BarChart>
          </ChartContainer>
        );
      case 'line':
        return (
          <ChartContainer config={{}} className="min-h-[200px] w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" />
            </LineChart>
          </ChartContainer>
        );
      case 'pie':
        return (
          <ChartContainer config={{}} className="min-h-[200px] w-full">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ChartContainer>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl z-50 transition-transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Otvori chatbot"
      >
        <Bot className="h-8 w-8" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full md:max-w-md bg-background/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl flex flex-col z-50">
          <header className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="flex items-center gap-2 font-headline text-lg gradient-text">
              <Bot />
              DaorsChatBot
            </h2>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Zatvori chat"
            >
                <X className="h-6 w-6" />
            </Button>
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
