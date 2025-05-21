import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PlayerManagement from '../../components/PlayerManagement';
import EventManagement from '../../components/EventManagement';
import WeeklyRoundManagement from '../../components/WeeklyRoundManagement';
import WeeklyResultsManagement from '../../components/WeeklyResultsManagement';
import ScoringSystemToggle from '../../components/ScoringSystemToggle';
import PrizePayouts from '../../components/PrizePayouts';
import Messaging from '../../components/Messaging';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('players');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const tabs = [
    { id: 'players', label: 'Players', component: <PlayerManagement /> },
    { id: 'events', label: 'Events', component: <EventManagement /> },
    { id: 'weeklyRounds', label: 'Weekly Rounds', component: <WeeklyRoundManagement /> },
    { id: 'weeklyResults', label: 'Weekly Results', component: <WeeklyResultsManagement /> },
    { id: 'scoringSystem', label: 'Scoring System', component: <ScoringSystemToggle /> },
    { id: 'prizePayouts', label: 'Prize Payouts', component: <PrizePayouts /> },
    { id: 'messaging', label: 'Messaging', component: <Messaging /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#1B4D3E' 
      }}>
        <p style={{ color: '#F5E8C7' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', padding: '2rem' }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        backgroundColor: '#F5E8C7', 
        borderRadius: '0.5rem', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)', 
        padding: '1.5rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem' 
        }}>
          <h1 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold', 
            color: '#3C2F2F' 
          }}>
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#3C2F2F',
              color: '#F5E8C7',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#C71585'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#3C2F2F'; }}
          >
            Logout
          </button>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '0.25rem',
                backgroundColor: activeTab === tab.id ? '#C71585' : '#3C2F2F',
                color: '#F5E8C7',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => { 
                if (activeTab !== tab.id) e.target.style.backgroundColor = '#87CEEB'; 
                e.target.style.color = '#3C2F2F'; 
              }}
              onMouseOut={(e) => { 
                if (activeTab !== tab.id) e.target.style.backgroundColor = '#3C2F2F'; 
                e.target.style.color = '#F5E8C7'; 
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.25rem', 
          padding: '1.5rem',
          minHeight: '400px'
        }}>
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}