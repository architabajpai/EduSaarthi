'use client';
import { useState, useEffect } from 'react';
import { Mic, Volume2, Send } from 'lucide-react';

export default function VoiceControls({ lang, onSend, input, setInput }: any) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new (SpeechRecognition as any)();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      onSend(transcript);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);

    if (isListening) recognition.start();
    return () => recognition.stop();
  }, [isListening, lang]);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex space-x-2">
      <button onClick={() => setIsListening(!isListening)} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600">
        <Mic className={!isListening ? 'w-5 h-5' : 'animate-pulse w-5 h-5'} />
      </button>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={lang === 'hi' ? 'टाइप करें या बोलें...' : 'Type or speak...'}
        onKeyDown={(e) => e.key === 'Enter' && input.trim() && onSend(input.trim())}
      />
      {(input || isListening) && (
        <>
          <button onClick={() => speak(input)} className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600">
            <Volume2 className="w-5 h-5" />
          </button>
          <button onClick={() => { onSend(input); setInput(''); }} className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <Send className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}

