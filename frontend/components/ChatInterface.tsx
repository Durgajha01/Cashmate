'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, X, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content:
        "Hello! I'm your AI financial advisor. I can help analyze your spending, give personalized recommendations, and answer questions about your financial health. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // WebSocket connection to your FastAPI backend
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000/interact');

    websocket.onopen = () => {
      console.log('Connected to FinanceAI backend');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const reply = event.data; // Format: "reply text | intent: xxx"
      const newMsg: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setIsLoading(false);
      scrollToBottom();
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'system',
          content: 'Connection error. Please try again.',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    };

    websocket.onclose = () => {
      console.log('WebSocket closed');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: 'system',
          content: 'Disconnected from server.',
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if ((!input.trim() && !selectedFile) || !ws || ws.readyState !== WebSocket.OPEN) {
      return;
    }

    // Build user message content
    let userContent = input.trim();
    let backendPayload = input.trim();

    if (selectedFile) {
      userContent = userContent
        ? `${userContent}\n[Attached file: ${selectedFile.name}]`
        : `Analyzing file: ${selectedFile.name}`;
      backendPayload = `[FILE_UPLOAD] ${selectedFile.name}\n${input.trim()}`;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    // Send to backend
    ws.send(backendPayload);
    scrollToBottom();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Optional: focus input so user can add a question about the file
      const inputEl = document.querySelector('input') as HTMLInputElement;
      if (inputEl) inputEl.focus();
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Chat Messages */}
      <Card className="flex-1 p-6 flex flex-col overflow-hidden">
        <h2 className="text-lg font-bold text-foreground mb-4">AI Financial Assistant</h2>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : message.type === 'system'
                    ? 'bg-yellow-100 text-yellow-900 rounded-lg'
                    : 'bg-muted text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-muted text-foreground rounded-bl-none flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area with file preview */}
        <div className="flex flex-col gap-2">
          {/* File preview chip */}
          {selectedFile && (
            <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm w-fit">
              <Paperclip size={14} />
              <span className="max-w-[180px] truncate">{selectedFile.name}</span>
              <button
                onClick={removeFile}
                className="text-muted-foreground hover:text-foreground"
                title="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Main input row */}
          <div className="flex gap-2 items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".csv,.pdf,.xlsx,.xls"
              className="hidden"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={triggerFileInput}
              className="h-10 w-10"
              title="Attach CSV, PDF or Excel file"
            >
              <Paperclip size={20} />
            </Button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about expenses, savings, goals... or attach file"
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              disabled={isLoading}
            />

            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!input.trim() && !selectedFile)}
              className="px-4 gap-2"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={16} />}
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}