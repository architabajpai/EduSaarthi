'use client'; 
import laptopBg from '../../lib/1500x900_343237-school-education-teacher1440.jpg';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageToggle from '../../../components/LanguageToggle';
import { useLanguage } from '../../lib/language-context';

const translations = {
  en: {
    title: '📚️ EduSaarthi',
    subtitle: 'Login with your teacher account',
    email: 'Email',
    emailPlaceholder: 'teacher@school.com',
    password: 'Password',
    login: 'Login',
    loggingIn: 'Logging in...',
    demoAccount: 'Demo Account:',
    demoEmail: 'teacher@school.com',
    demoPassword: '123456',
    error: {
      invalid: 'Invalid email or password',
      network: 'Network error. Please try again.',
      required: 'Email and password required'
    }
  },
  hi: {
    title: '📚️ एडुसारथी',
    subtitle: 'अपने शिक्षक खाते से लॉगिन करें',
    email: 'ईमेल',
    emailPlaceholder: 'teacher@school.com',
    password: 'पासवर्ड',
    login: 'लॉगिन करें',
    loggingIn: 'लॉगिन हो रहा है...',
    demoAccount: 'डेमो अकाउंट:',
    demoEmail: 'teacher@school.com',
    demoPassword: '123456',
    error: {
      invalid: 'गलत ईमेल या पासवर्ड',
      network: 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।',
      required: 'ईमेल और पासवर्ड आवश्यक'
    }
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError(t.error.required);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || t.error.invalid);
      }
    } catch (err) {
      setError(t.error.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${laptopBg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative'
    }}>
      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)', zIndex: 1
      }} />

      {/* MAIN LOGIN CONTAINER */}
      <div style={{
        backdropFilter: 'blur(20px)',
        padding: '3rem 3.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%', maxWidth: '850px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        position: 'relative', zIndex: 2
      }}>
      
        {/* Two column layout */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Left side - Header */}
          <div style={{ flex: '0 0 310px' }}>
            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: 'bold',
              color: 'white',  // ✅ Pure white text
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',  // ✅ Subtle shadow for definition
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {t.title}
            </h1>
            <p style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0, textAlign: 'left', marginBottom: '1.5rem' }}>
              {t.subtitle}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <LanguageToggle />
            </div>
          </div>

          {/* Right side - Form */}
          <div style={{ flex: 1 }}>
            {/* Error */}
            {error && (
              <div style={{
                background: '#fee2e2', color: '#dc2626',
                padding: '1rem', borderRadius: '0.75rem',
                marginBottom: '1.5rem', borderLeft: '4px solid #dc2626',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', marginBottom: '0.5rem', 
              fontWeight: '600', color: '#000',
              fontSize: '0.95rem'
            }}>
              {t.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.6)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                color: '#000'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05)';
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '600', 
              color: '#000',
              fontSize: '0.95rem'
            }}>
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none',
                background: 'rgba(255, 255, 255, 0.6)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                color: '#000'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.6)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.05)';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              padding: '1.25rem 2rem',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
              transition: 'all 0.2s ease',
              opacity: loading || !email || !password ? 0.7 : 1,
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (!loading && email && password) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.3)';
            }}
          >
            {loading ? (
              <>
                <span style={{ marginRight: '0.75rem' }}>⏳</span>
                {t.loggingIn}
              </>
            ) : (
              t.login
            )}
          </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
