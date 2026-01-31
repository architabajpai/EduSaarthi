'use client';
import { useState, useRef, useEffect } from 'react';

interface ChatBoxProps {
  lang: 'en' | 'hi';
}

export default function ChatBox({ lang }: ChatBoxProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user' as const, content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          language: lang
          // ✅ JWT cookie handles user auth automatically
        }),
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant' as const, content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant' as const, 
        content: lang === 'hi' ? 'कृपया फिर से कोशिश करें' : 'Please try again' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[70vh] flex flex-col shadow-2xl rounded-3xl overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-3xl">🤖</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {lang === 'hi' ? 'शिक्षक सहायक तैयार' : 'AI Assistant Ready'}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              {lang === 'hi' 
                ? 'बच्चों की पढ़ाई, क्लासरूम मैनेजमेंट या शिक्षण से जुड़े सवाल पूछें'
                : 'Ask about classroom management, teaching challenges, or student learning'
              }
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-5 rounded-3xl shadow-lg transform transition-all ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white translate-x-2 ml-12'
                  : 'bg-white border-2 border-gray-100 text-gray-900 -translate-x-2 mr-12 hover:shadow-xl'
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed text-lg">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        
        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-5 border-2 border-gray-100 rounded-3xl shadow-lg max-w-lg mr-12">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-gray-500 text-sm font-medium">AI सहायक सोच रहा है...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t-2 border-gray-200 p-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-end space-x-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              lang === 'hi' 
                ? "अपना सवाल लिखें... (Enter दबाकर भेजें)" 
                : "Type your teaching question here... (Press Enter to send)"
            }
            className="flex-1 p-5 pr-16 border-2 border-gray-200 rounded-3xl resize-none focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-300 transition-all shadow-inner max-h-32 placeholder-gray-500 text-lg leading-relaxed"
            rows={1}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="group relative px-8 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:shadow-none disabled:cursor-not-allowed whitespace-nowrap flex items-center space-x-3 text-lg"
          >
            <span>{lang === 'hi' ? 'भेजें' : 'Send'}</span>
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {lang === 'hi' ? 'टिप: Enter दबाकर तुरंत भेजें' : 'Tip: Press Enter to send instantly'}
        </p>
      </div>
    </div>
  );
}

