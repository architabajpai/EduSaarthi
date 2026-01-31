'use client';
import Link from 'next/link';
import { useLanguage } from '../../lib/language-context';
import LanguageToggle from '../../../components/LanguageToggle';

const translations = {
  en: {
    title: '🚀 What to teach today?',
    subtitle: 'Choose the best teaching methods for your students',
    chatTitle: 'AI Chat',
    chatDesc: 'Get instant teaching suggestions',
    historyTitle: 'History',
    historyDesc: 'View previous conversations',
    quickTips: 'Quick Tips',
    stats: {
      chats: 'Chats',
      suggestions: 'Suggestions',
      avgRating: 'Avg Rating'
    }
  },
  hi: {
    title: '🚀 आज क्या सिखाएंगे?',
    subtitle: 'अपने छात्रों के लिए सबसे अच्छे शिक्षण तरीके चुनें',
    chatTitle: 'AI चैट',
    chatDesc: 'तुरंत शिक्षण सुझाव पाएं',
    historyTitle: 'इतिहास',
    historyDesc: 'पिछली बातचीत देखें',
    quickTips: 'त्वरित सुझाव',
    stats: {
      chats: 'चैट',
      suggestions: 'सुझाव',
      avgRating: 'औसत रेटिंग'
    }
  }
};

export default function DashboardHome() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Welcome Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        padding: '0 2rem'
      }}>
        <h2 style={{
          fontSize: '2.75rem',
          color: "#ffffff",
          fontWeight: 'bold',
          WebkitBackgroundClip: 'text',
          marginBottom: '1.25rem',
          lineHeight: '1.2'
        }}>
          {t.title}
        </h2>
        <p style={{ 
          fontSize: '1.35rem', 
          color: '#ffffff', 
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {t.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: '#abf7b1',
          color: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '1.75rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💬</div>
          <h3 style={{ fontSize: '1.6rem', color : "#000000", marginBottom: '0.5rem', fontWeight: '700' }}>
            {t.chatTitle}
          </h3>
          <p style={{ fontSize: '1.1rem', color: "#000000", opacity: 0.95, margin: 0 }}>{t.chatDesc}</p>
        </div>

        <div style={{
          background: '#abf7b1',
          color: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '1.75rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(16, 185, 129, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ fontSize: '1.6rem', color: "#000000", marginBottom: '0.5rem', fontWeight: '700' }}>
            {t.historyTitle}
          </h3>
          <p style={{ fontSize: '1.1rem', color: "#000000", opacity: 0.95, margin: 0 }}>{t.historyDesc}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>
        <Link href="/dashboard/chat" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '2.5rem 3rem',
          background: '#abf7b1',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 35px 70px rgba(59, 130, 246, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.4)';
        }}>
          <div style={{ 
            width: '80px', height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', backdropFilter: 'blur(10px)'
          }}>
            ✨
          </div>
          <div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '800', 
              color: "#000000",
              marginBottom: '0.75rem',
              lineHeight: '1.2'
            }}>
              {language === 'hi' ? 'AI चैट शुरू करें' : 'Start AI Chat'}
            </h3>
            <p style={{ fontSize: '1.2rem', color: "#000000", margin: 0, opacity: 0.95 }}>
              {language === 'hi' ? 'कक्षा 1-5 के लिए तैयार पाठ योजनाएं' : 'Ready lesson plans for classes 1-5'}
            </p>
          </div>
        </Link>

        <Link href="/dashboard/history" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          padding: '2.5rem 3rem',
          background: '#abf7b1',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px rgba(16, 185, 129, 0.4)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 35px 70px rgba(16, 185, 129, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(16, 185, 129, 0.4)';
        }}>
          <div style={{ 
            width: '80px', height: '80px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', backdropFilter: 'blur(10px)'
          }}>
            📖
          </div>
          <div>
            <h3 style={{ 
              fontSize: '2rem', 
              color: "#000000",
              fontWeight: '800', 
              marginBottom: '0.75rem',
              lineHeight: '1.2'
            }}>
              {language === 'hi' ? 'पिछली बातचीत देखें' : 'View Previous Conversations'}
            </h3>
            <p style={{ fontSize: '1.2rem', color: "#000000", margin: 0, opacity: 0.95 }}>
              {language === 'hi' ? 'सभी AI सुझाव एक जगह' : 'All AI suggestions in one place'}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

