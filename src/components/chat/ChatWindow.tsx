"use client";

import { X, RefreshCw, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useChat } from "./useChat";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "What is OpSuite?",
  "How to start a project?",
  "Explain IoT simply",
  "Do you build mobile apps?",
  "What services do you offer?",
  "Pricing for custom software",
  "Explain Modbus",
  "About TekMakon",
];

export default function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { messages, isLoading, sendMessage, clearMessages } = useChat(); // Added clearMessages if available, or we can add it to useChat
  const [inputMessage, setInputMessage] = useState("");
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Shuffle suggestions on open
  useEffect(() => {
    if (isOpen) {
      const shuffled = [...SUGGESTIONS].sort(() => 0.5 - Math.random());
      setActiveSuggestions(shuffled.slice(0, 3));
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setInputMessage("");
    await sendMessage(text);
  };

  const handleRefresh = () => {
     // Optional: Clear chat or just refresh suggestions
     // For now, let's just refresh suggestions to show interactivity
     const shuffled = [...SUGGESTIONS].sort(() => 0.5 - Math.random());
     setActiveSuggestions(shuffled.slice(0, 3));
  };

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[600px] max-h-[80vh] flex flex-col bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden font-sans z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#4ADE80] text-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <div>
            <h3 className="font-bold text-sm">TekMakon AI</h3>
            <p className="text-xs opacity-80 font-medium">Smart Engineering Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Refresh suggestions"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#121212]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[#1a1a1a] font-bold text-xs",
                msg.role === "user" ? "bg-[#333] text-white" : "bg-[#4ADE80]"
              )}
            >
              {msg.role === "user" ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>

            {/* Bubble */}
            <div className="flex flex-col gap-2 max-w-[85%]">
                <div
                className={cn(
                    "p-3.5 text-sm leading-relaxed shadow-sm",
                    msg.role === "user"
                    ? "bg-[#4ADE80] text-[#1a1a1a] rounded-2xl rounded-tr-sm font-medium"
                    : "bg-[#1a1a1a] border border-gray-800 text-gray-200 rounded-2xl rounded-tl-sm"
                )}
                >
                {msg.content}
                </div>
                
                {/* Contextual Chips (Only for Assistant messages, optionally) */}
                 {msg.role === 'assistant' && msg.content.includes("services") && (
                     <div className="flex flex-wrap gap-2 mt-1">
                         {['Services', 'Products', 'Contact'].map(chip => (
                             <button 
                                key={chip}
                                onClick={() => handleSend(chip)}
                                className="text-xs border border-gray-700 hover:bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full transition-colors"
                             >
                                {chip}
                             </button>
                         ))}
                     </div>
                 )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-[#4ADE80] flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <div className="bg-[#1a1a1a] border border-gray-800 p-4 rounded-2xl rounded-tl-sm w-16">
              <div className="flex space-x-1 h-2 items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips Area (Sticky Bottom) */}
      {!isLoading && (
        <div className="bg-[#121212] px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar mask-gradient">
            {activeSuggestions.map((suggestion, idx) => (
                <button
                    key={idx}
                    onClick={() => handleSend(suggestion)}
                    className="whitespace-nowrap text-xs bg-[#1a1a1a] border border-gray-800 hover:border-[#4ADE80] hover:text-[#4ADE80] text-gray-400 px-4 py-2 rounded-full transition-all"
                >
                    {suggestion}
                </button>
            ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-[#1a1a1a] border-t border-gray-800">
        <form
          className="relative flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputMessage);
          }}
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about TekMakon..."
            className="w-full bg-[#121212] text-gray-200 border border-gray-800 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-full pl-5 pr-12 py-3 text-sm outline-none transition-all placeholder:text-gray-600"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputMessage.trim() || isLoading}
            className="absolute right-1.5 w-9 h-9 rounded-full bg-[#4ADE80] hover:bg-[#3ecf72] text-[#1a1a1a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </Button>
        </form>
        <div className="text-[10px] text-gray-600 text-center mt-3">
          AI can make mistakes. Contact support for critical inquiries.
        </div>
      </div>
    </div>
  );
}
