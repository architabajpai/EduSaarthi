'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageToggle from '../../../components/LanguageToggle';
import { useLanguage } from '../../lib/language-context';

const translations = {
  en: {
    dashboard: 'Teacher Dashboard',
    assistant: 'Simple Teaching Assistant',
    dashboardNav: 'Dashboard',
    chatNav: 'AI Chat',
    historyNav: 'History',
    profileNav: 'Profile',
    logout: 'Logout'
  },
  hi: {
    dashboard: 'शिक्षक डैशबोर्ड',
    assistant: 'सरल शिक्षण सहायक',
    dashboardNav: 'डैशबोर्ड',
    chatNav: 'AI चैट',
    historyNav: 'इतिहास',
    profileNav: 'प्रोफाइल',
    logout: 'लॉगआउट'
  }
};

interface TProfile {
  name: string;
  email: string;
  role: string;
  school: string;
  joined: string;
}

const theme = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#10b981',
  accent: '#f59e0b',
  danger: '#ef4444',
  surface: '#006400',
  glass: 'rgba(255, 255, 255, 0.25)',
  backdrop: 'rgba(255, 255, 255, 0.75)',
  shadows: {
    card: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    glass: '0 8px 32px rgba(31, 38, 135, 0.25)',
    hover: '0 20px 40px rgba(99, 102, 241, 0.3)'
  },
  radius: {
    card: '24px',
    button: '16px'
  }
};


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const [profile, setProfile] = useState<TProfile | " ">(" ");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');
  
  // ✅ DETECT CURRENT PAGE
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';


  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

   useEffect(() => {
    const fProfile = async () => {
      try {
        setLoading(true);

        // ✅ CALL YOUR EXISTING getUserFromToken API
        const response = await fetch('/api/auth/me');

        const data = await response.json();
        
        if (data.user) {
          setProfile({
            name: data.user.name || data.user.email.split('@')[0],
            email: data.user.email,
            role: capitalize(data.user.role) || 'Teacher',
            school: data.user.school || 'Govt Primary School',
            joined: data.user.joined
          });
          console.log(profile.name);
        } else {
          setError('User not found');
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/login';
        }
      } catch (err: any) {
        setError('Failed to load profile');
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fProfile();
    setIsClient(true);
  }, []);

  if (!isClient || loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          fontSize: '2rem', 
          color: theme.surface,
          background: "#abf7b1",
          padding: '2rem 4rem',
          borderRadius: theme.radius.card,
          boxShadow: theme.shadows.card
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: `radial-gradient(ellipse at top left, ${theme.primary}10 0%, #f8fafc 50%)`,
      display: 'flex' 
    }}>
      {/* Sidebar - UNCHANGED */}
      <div style={{
        width: sidebarOpen ? '300px' : '85px',
        background: theme.surface,
        backdropFilter: 'blur(25px)',
        color: 'white',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100vh',
        position: 'fixed',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: theme.shadows.glass
      }}>
        <div style={{ 
          padding: '2.5rem 2rem', 
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', 
          alignItems: 'center', 
          gap: sidebarOpen ? '1.25rem' : '0'
        }}>
          <div style={{
            width: '60px', height: '60px',
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 'bold',
            boxShadow: theme.shadows.card,
            flexShrink: 0
          }}>
            📚️
          </div>
          {sidebarOpen && profile && (
            <div style={{ minWidth: 0 }}>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: '700', 
                marginBottom: '0.25rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {profile.name}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                opacity: 0.85 
              }}>
                {profile.role}
              </div>
            </div>
          )}
        </div>

        <nav style={{ padding: '2.5rem 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* ✅ FIXED: Proper active state for EACH page */}
          <NavLink href="/dashboard" label={t.dashboardNav} icon="📊" active={pathname === '/dashboard'} sidebarOpen={sidebarOpen} />
          <NavLink href="/dashboard/chat" label={t.chatNav} icon="💬" active={pathname === '/dashboard/chat'} sidebarOpen={sidebarOpen} />
          <NavLink href="/dashboard/history" label={t.historyNav} icon="📚" active={pathname === '/dashboard/history'} sidebarOpen={sidebarOpen} />
          <NavLink href="/dashboard/profile" label={t.profileNav} icon="👤" active={pathname === '/dashboard/profile'} sidebarOpen={sidebarOpen} />
        </nav>


        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          width: '52px', height: '52px',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {sidebarOpen ? '◀️' : '▶️'}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sidebarOpen ? '300px' : '85px',
        flex: 1,
        padding: '2.5rem',
        transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh'
      }}>
        {/* ✅ CONDITIONAL HEADER - BIG on Dashboard, SMALL on others */}
        {isDashboard ? (
          // 🎨 BIG HEADER (Dashboard only)
          <BigHeader profile={profile} t={t} theme={theme} />
        ) : (
          // 🛠️ SMALL HEADER (Other pages)
          <SmallHeader t={t} theme={theme} />
        )}

        {/* Content Card */}
        <div style={{ 
          background: theme.surface,
          backdropFilter: 'blur(25px)',
          borderRadius: theme.radius.card, 
          padding: '2.75rem', 
          boxShadow: theme.shadows.card,
          minHeight: '60vh',
          border: '1px solid rgba(255,255,255,0.2)',
          marginTop: isDashboard ? '0' : '1.5rem'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// 🎨 BIG HEADER - Dashboard Only
const BigHeader = ({ profile, t, theme }: any) => (
  <div style={{
    background: theme.surface,
    backdropFilter: 'blur(25px)',
    padding: '2.25rem 2.75rem',
    borderRadius: theme.radius.card,
    boxShadow: theme.shadows.card,
    marginBottom: '2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
    position: 'sticky',
    top: '2.5rem',
    zIndex: 50
  }}>
    <div>
      <h1 style={{ 
        fontSize: '2.875rem', 
        fontWeight: '800', 
        color: '#abf7b1',
        WebkitBackgroundClip: 'text',
        margin: 0, 
        lineHeight: '1.15'
      }}>
        {t.dashboard}
      </h1>
      <p style={{ 
        color: '#ffffff', 
        margin: '0.875rem 0 0 0',
        fontSize: '1.125rem',
        fontWeight: '500'
      }}>
        {profile?.joined || '19 Jan 2026'} • {t.assistant}
      </p>
    </div>
    <LanguageToggle />
  </div>
);

// 🛠️ SMALL HEADER - Other Pages
const SmallHeader = ({ t, theme }: any) => (
  <div style={{
    background: theme.surface,
    backdropFilter: 'blur(20px)',
    padding: '1rem 1.5rem',
    borderRadius: '16px',
    boxShadow: theme.shadows.glass,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(255,255,255,0.3)',
    marginBottom: '1rem'
  }}>
    <div style={{ fontSize: '1.75rem', color: "#abf7b1", fontWeight: '700'}}>
      {t.dashboard}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <LanguageToggle />
      <button 
        onClick={() => {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = '/login';
        }}
        style={{
          padding: '0.75rem 1.25rem',
          background: `linear-gradient(135deg, ${theme.danger}, #dc2626)`,
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '0.875rem',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(239,68,68,0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        🚪 {t.logout}
      </button>
    </div>
  </div>
);

// NavLink Component (unchanged)
const NavLink = ({ href, icon, label, active = false, sidebarOpen }: any) => (
  <Link 
    href={href} 
    style={{
      padding: '1.375rem 2rem',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '1.25rem',
      fontWeight: active ? '800' : '600',
      fontSize: '1.0625rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '0 24px 24px 0',
      margin: '0 1rem',
      position: 'relative',
      background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
      boxShadow: active ? '6px 0 24px rgba(255,255,255,0.2)' : 'none'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.transform = 'translateX(12px)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateX(0)';
      }
    }}
  >
    <span style={{ fontSize: '1.625rem', minWidth: '28px' }}>{icon}</span>
    {sidebarOpen && <span>{label}</span>}
  </Link>
);
