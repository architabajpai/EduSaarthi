'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('teacher-app-language') as 'en' | 'hi' | null;
    if (saved === 'hi') {
      setLanguage('hi');
    }
  }, []);

  // ✅ Save to localStorage on change
  const handleSetLanguage = (newLang: 'en' | 'hi') => {
    setLanguage(newLang);
    localStorage.setItem('teacher-app-language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

