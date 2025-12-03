"use client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatbotButton() {
  // In a real application, this function would open a chat widget
  const handleChatOpen = () => {
    console.log("Chatbot button clicked. Opening chat interface...");
    // Add integration code here (e.g., Tawk.to, Intercom, custom modal)
  };

  return (
    // Fixed positioning ensures it stays in place when scrolling (if scrolling were enabled)
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        // Using the secondary gradient color for prominence and shadow for depth
        className="h-14 w-14 rounded-full bg-[#6a0dac] hover:bg-[#7d1bd8] shadow-2xl transition-transform duration-300 hover:scale-105"
        onClick={handleChatOpen}
        aria-label="Open Chatbot"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}