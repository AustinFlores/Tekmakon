"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ChatWindow from "./chat/ChatWindow";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      
      <div className="fixed bottom-6 right-6 z-50 print:hidden">
        <Button
          size="icon"
          className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${
            isOpen 
              ? "bg-destructive hover:bg-destructive/90 rotate-90" 
              : "bg-[#6a0dac] hover:bg-[#7d1bd8]"
          }`}
          onClick={toggleChat}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </>
  );
}
