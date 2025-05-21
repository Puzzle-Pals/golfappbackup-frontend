import { useState } from 'react';
import Link from 'next/link';
import PlayerManagement from '../../components/PlayerManagement';
import EventManagement from '../../components/EventManagement';
import WeeklyResultsManagement from '../../components/WeeklyResultsManagement';
import News from '../../components/News';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('players');

  const tabs = [
    { id: 'players', label: 'Players', component: <PlayerManagement /> },
    { id: 'events', label: 'Events', component: <EventManagement /> },
    { id: 'weeklyResults', label: 'Weekly Results', component: <WeeklyResultsManagement /> },
    { id: 'news', label: 'News', component: <News /> },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', padding: '2rem' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
        </div>
      </nav>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#F5E8C7', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#3C2F2F', marginBottom: '1.5rem' }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                backgroundColor: activeTab === tab.id ? '#C71585' : '#3C2F2F',
                color: '#F5E8C7',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => { if (activeTab !== tab.id) e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
              onMouseOut={(e) => { if (activeTab !== tab.id) e.target.style.backgroundColor = '#3C2F2F'; e.target.style.color = '#F5E8C7'; }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{tabs.find((tab) => tab.id === activeTab)?.component}</div>
      </div>
    </div>
  );
}