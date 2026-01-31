'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../lib/language-context'; // 👈 DASHBOARD LANGUAGE!

const theme = {
  // 👇 EXACT template.js brown colors
  primary: '#8B4513',      // Saddle brown (main)
  primaryDark: '#654321',   // Dark brown
  secondary: '#A0522D',     // Sienna (accent)
  lightBrown: '#D2B48C',    // Tan/light brown
  bgGradient: 'linear-gradient(135deg, #f5f5dc 0%, #d2b48c 50%, #deb887 100%)',
  userBubble: '#8B4513',    // Matches template user messages
  aiBubble: '#A0522D',      // Matches template AI messages
  inputBg: '#faf0e6',       // Linen/creamy
  border: '#D2691E',        // Chocolate border
  textDark: '#5D4037',      // Dark brown text
  shadow: 'rgba(139, 69, 19, 0.25)'
};

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // ✅ USE DASHBOARD LANGUAGE CONTEXT (no separate toggle!)
  const { language } = useLanguage(); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!question.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: '',
      language,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage.question,
          language  // 👈 Sends dashboard language to API!
        })
      });

      const data = await response.json();
      
      if (data.answer) {
        setMessages(prev => prev.map((msg: any) =>
          msg.id === userMessage.id
            ? { ...msg, answer: data.answer }
            : msg
        ));
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DYNAMIC TEXT BASED ON DASHBOARD LANGUAGE
  const t = {
    title: language === 'hi' ? '🤖 AI शिक्षक सहायक' : '🤖 AI Teacher Assistant',
    subtitle: language === 'hi' ? 'प्रश्न पूछें, तुरंत उत्तर पाएं!' : 'Ask questions, get instant answers!',
    emptyTitle: language === 'hi' ? 'कोई बातचीत शुरू करें' : 'Start a conversation',
    emptySubtitle: language === 'hi' ? 'यहाँ अपना पहला प्रश्न लिखें' : 'Write your first question here',
    yourQuestion: language === 'hi' ? 'आपका प्रश्न:' : 'Your question:',
    aiThinking: language === 'hi' ? 'AI सोच रहा है...' : 'AI is thinking...',
    send: language === 'hi' ? 'भेजें' : 'Send',
    placeholder: language === 'hi' 
      ? "अपना प्रश्न यहाँ लिखें... (Enter दबाएं भेजने के लिए)"
      : "Type your question here... (Press Enter to send)"
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header - DYNAMIC LANGUAGE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          background: `#006400`,
          WebkitBackgroundClip: 'text',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '1rem'
        }}>{t.title}</h1>
          <p style={{ fontSize: '1.25rem', color: '#000000' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '2rem',
          padding: '2rem',
          background: 'white',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px ${theme.shadow}',
          border: '1px solid ${theme.border}',
          minHeight: '400px',
          maxHeight: '60vh'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', colo: "#000000", fontWeight: '600', marginBottom: '0.5rem' }}>
                {t.emptyTitle}
              </h3>
              <p>{t.emptySubtitle}</p>
            </div>
          ) : (
            messages.map((msg: any) => (
              <div key={msg.id} style={{ marginBottom: '2rem' }}>
                {/* User message - RIGHT */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: "#006400",
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '1.5rem 1.5rem 0.5rem 1.5rem',
                    maxWidth: '70%',
                    boxShadow: '0 4px 12px ${theme.shadow}'
                  }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {t.yourQuestion}
                    </p>
                    <p>{msg.question}</p>
                  </div>
                </div>
                
                {/* AI message - LEFT */}
                {msg.answer && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      background: '#abf7b1',
                      color: '#000000',
                      padding: '1.5rem 2rem',
                      borderRadius: '1.5rem 1.5rem 1.5rem 0.5rem',
                      maxWidth: '75%',
                      boxShadow: '0 10px 25px rgba(139, 69, 19, 0.25)',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {msg.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          
          {/* Loading - LEFT */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                background: '#f1f5f9',
                padding: '1.5rem 2rem',
                borderRadius: '1.5rem 1.5rem 0.5rem 1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                maxWidth: '75%'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e2e8f0',
                    borderTop: '3px solid #8b5cf6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <span style={{ color: '#64748b' }}>
                    {t.aiThinking}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '2rem',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t.placeholder}
                style={{
                  flex: 1,
                  padding: '1.25rem',
                  border: '2px solid ${theme.border}',
                  borderRadius: '1.5rem',
                  background: "#abf7b1",
                  resize: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  minHeight: '100px',
                  fontFamily: 'inherit'
                }}
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !question.trim()}
                style={{
                  padding: '1.25rem 2rem',
                  background: '#006400',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '1.5rem',
                  border: 'none',
                  cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !question.trim() ? 0.6 : 1,
                  boxShadow: '0 10px 25px rgba(139, 69, 19, 0.25)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? '⏳' : t.send} {/* ✅ DYNAMIC SEND BUTTON! */}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

