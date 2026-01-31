'use client';
import { useLanguage } from '../src/lib/language-context';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: 'rgba(255,255,255,0.9)',
      borderRadius: '2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontWeight: '500'
    }}>
      <button
        onClick={() => setLanguage('en')}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '1.5rem',
          border: 'none',
          background: language === 'en' ? '#3b82f6' : 'transparent',
          color: language === 'en' ? 'white' : '#374151',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontWeight: '600'
        }}
        onMouseOver={(e) => {
          if (language !== 'en') e.currentTarget.style.background = '#e0e7ff';
        }}
        onMouseOut={(e) => {
          if (language !== 'en') e.currentTarget.style.background = 'transparent';
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('hi')}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '1.5rem',
          border: 'none',
          background: language === 'hi' ? '#8b5cf6' : 'transparent',
          color: language === 'hi' ? 'white' : '#374151',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontWeight: '600'
        }}
        onMouseOver={(e) => {
          if (language !== 'hi') e.currentTarget.style.background = '#ede9fe';
        }}
        onMouseOut={(e) => {
          if (language !== 'hi') e.currentTarget.style.background = 'transparent';
        }}
      >
        हिं
      </button>
    </div>
  );
}

