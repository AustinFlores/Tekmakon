"use client";

import { useState, useCallback } from "react";
import { Message, ChatState } from "@/types/chat";

export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: "init-1",
        role: "assistant",
        content: "Hello! I'm your TekMakon AI Guide. I can help you understand our services, guide you through products like OpSuite, or teach you about IoT concepts.",
        timestamp: new Date(),
      },
    ],
    isLoading: false,
  });

  const clearMessages = useCallback(() => {
     setState({
        messages: [
            {
                id: Date.now().toString(),
                role: "assistant",
                content: "Chat cleared. How can I help you now?",
                timestamp: new Date(),
            }
        ],
        isLoading: false
     });
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // 1. Add User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      // 2. Fetch Response from API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const data = await response.json();

      // 3. Add Assistant Message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Chat Error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    sendMessage,
    clearMessages // Exported here
  };
}
