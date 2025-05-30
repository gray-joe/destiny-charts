'use client';

import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  sources?: Array<{ name: string; type: string }>;
}

const SUPPORTED_WEAPON_TYPES = [
  'Linear Fusion Rifles',
  'Heavy Grenade Launchers',
  'Machine Guns',
  'Rockets',
  'Swords',
  'Breach Grenade Launchers',
  'Glaives',
  'Fusion Rifles',
  'Rocket Sidearms',
  'Sniper Rifles',
  'Shotguns',
  'Trace Rifles'
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 sticky top-0 bg-background z-10 py-2">Destiny 2 Weapon Assistant</h1>
      <div className="flex-1 overflow-y-auto">
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Ask questions about Destiny 2 weapons. I can help you with information about:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            {SUPPORTED_WEAPON_TYPES.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Ask me anything about Destiny 2 weapons! For example:
          </p>
          <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
            <li>&ldquo;What are the best rocket launchers?&rdquo;</li>
            <li>&ldquo;Tell me about machine guns&rdquo;</li>
            <li>&ldquo;What&apos;s the best linear fusion rifle?&rdquo;</li>
          </ul>
        </div>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary-dark text-white'
                    : 'bg-primary-light text-white'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    Sources: {message.sources.map(source => source.name).join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Destiny 2 weapons..."
          className="flex-1 p-2 border bg-primary-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
