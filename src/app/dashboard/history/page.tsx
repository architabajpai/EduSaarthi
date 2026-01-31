'use client';
import { useState, useEffect } from 'react';

interface Conversation {
  question: string;
  answer: string;
  language: string;
  timestamp: string;
}

export default function History() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-300 mx-auto mb-4"></div>
          <p className="text-white">Loading chat history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-green-300 mb-4">
          📚 Chat History
        </h1>
        <p className="text-xl text-white">Your recent conversations with AI Assistant</p>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-2xl border-2 border-dashed border-gray-200">
          <div className="text-gray-400 mb-4">📭</div>
          <h3 className="text-2xl font-semibold text-gray-500 mb-2">No conversations yet</h3>
          <p className="text-gray-500">Start chatting to see your history here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {conv.language === 'hi' ? 'हिंदी' : 'English'}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(conv.timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Your Question:</p>
                  <p className="text-lg bg-blue-50 p-3 rounded-xl">{conv.question}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">AI Answer:</p>
                  <p className="text-lg bg-gray-50 p-4 rounded-2xl whitespace-pre-wrap">{conv.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

