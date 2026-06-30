'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function AICoach() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello Francois, how can I optimize your training today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      toast.error('AI Coach unavailable. Check ANTHROPIC_API_KEY.');
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto h-[80vh] flex flex-col glass rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/10">
        <h2 className="text-3xl font-bold flex items-center gap-3"><span className="text-[#FFD700]">🤖</span> AI Coach</h2>
        <p className="text-sm text-white/60 mt-1">Your personal bodybuilding strategist</p>
      </div>
      <div className="flex-1 p-8 overflow-auto space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[80%] p-5 rounded-3xl ${msg.role === 'user' ? 'bg-[#C9A84C] text-black' : 'glass'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-[#C9A84C]">Coach is responding...</div>}
      </div>
      <div className="p-6 border-t border-white/10">
        <div className="flex gap-3">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about macros, form, or motivation..." 
            className="flex-1 bg-black/60 border border-white/20 rounded-full px-8 py-4 focus:outline-none focus:border-[#FFD700]" 
          />
          <button onClick={sendMessage} disabled={isLoading} className="bg-[#C9A84C] hover:bg-[#FFD700] text-black p-4 rounded-full transition">
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
