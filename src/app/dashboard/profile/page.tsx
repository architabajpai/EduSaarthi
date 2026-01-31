'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../../lib/language-context';
import LanguageToggle from '../../../../components/LanguageToggle';

const translations = {
  en: {
    title: '👤 My Profile',
    personalInfo: 'Personal Information',
    settings: 'Settings',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    school: 'School',
    subjects: 'Subjects',
    joined: 'Joined',
    totalChats: 'Total Chats',
    changePassword: 'Change Password',
    languageSettings: 'Language Settings',
    updateProfile: 'Update Profile',
    stats: 'Statistics',
    saveChanges: 'Save Changes',
    loading: 'Loading profile...'
  },
  hi: {
    title: '👤 मेरा प्रोफाइल',
    personalInfo: 'व्यक्तिगत जानकारी',
    settings: 'सेटिंग्स',
    name: 'नाम',
    email: 'ईमेल',
    role: 'भूमिका',
    school: 'स्कूल',
    subjects: 'विषय',
    joined: 'शामिल हुए',
    totalChats: 'कुल चैट',
    changePassword: 'पासवर्ड बदलें',
    languageSettings: 'भाषा सेटिंग्स',
    updateProfile: 'प्रोफाइल अपडेट करें',
    stats: 'आंकड़े',
    saveChanges: 'परिवर्तन सहेजें',
    loading: 'प्रोफाइल लोड हो रहा है...'
  }
};

interface TeacherProfile {
  name: string;
  email: string;
  role: string;
  school: string;
  joined: string;
  createdAt: string;
  totalChats: number;
  phone?: string;
  grade?: string;
  subject?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // ✅ FETCH REAL USER DATA from JWT token
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // ✅ CALL YOUR EXISTING getUserFromToken API
        const response = await fetch('/api/auth/me');

        const data = await response.json();
        console.log(data);
        
        if (data.user) {
          setProfile({
            name: data.user.name || data.user.email.split('@')[0],
            email: data.user.email,
            role: capitalize(data.user.role) || 'Teacher',
            school: data.user.school || 'Govt Primary School',
            createdAt: data.user.createdAt,
            joined: data.user.joined,
            totalChats: data.user.totalChats || 0,
            grade: data.user.grade,
            subject: data.user.subjects
          });
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

    fetchProfile();
  }, []);

  console.log(profile);

  const handleSave = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setEditing(false);
        alert(language === 'hi' ? 'प्रोफाइल अपडेट हो गया!' : 'Profile updated!');
      }
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#ffffff'
      }}>
        {t.loading}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          background: '#abf7b1',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t.title}
        </h2>
        <LanguageToggle />
      </div>

      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '1.5rem',
          borderRadius: '1.5rem',
          marginBottom: '2rem',
          borderLeft: '5px solid #dc2626'
        }}>
          {error}
        </div>
      )}

      {profile && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Personal Info */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            padding: '2.5rem',
            borderRadius: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              marginBottom: '2rem',
              color: '#1e293b'
            }}>
              {t.personalInfo}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>{t.name}:</span>
                <span style={{ fontWeight: editing ? '500' : '700', color: '#1e293b' }}>
                  {editing ? (
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      style={{
                        border: '2px solid #e2e8f0',
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        width: '250px'
                      }}
                    />
                  ) : (
                    profile.name
                  )}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>{t.email}:</span>
                <span style={{ fontWeight: '600', color: '#3b82f6' }}>{profile.email}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>{t.role}:</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>{profile.role}</span>
              </div>
                
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>{t.subjects}:</span>
                <span>{profile.subject}</span>
              </div>

              {profile.school && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: '#374151' }}>{t.school}:</span>
                  <span>{profile.school}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#374151' }}>{t.joined}:</span>
                <span>{profile.joined}</span>
              </div>
            </div>
          </div>

          {/* Stats & Settings */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Stats */}
            <div style={{
              background: '#abf7b1',
              padding: '2.5rem',
              borderRadius: '2rem',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1.75rem', 
                marginBottom: '1.5rem',
                color: '#000000'
              }}>
                📊
                {t.stats}
              </h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#000000', marginBottom: '1rem' }}>
                {profile.totalChats}
              </div>
              <p style={{ color: '#000000', fontSize: '1.1rem' }}>
                {t.totalChats}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

