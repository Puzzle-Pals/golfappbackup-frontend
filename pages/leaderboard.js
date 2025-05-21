import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointsSystemEnabled, setPointsSystemEnabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to fetch leaderboard');
      }
    };
    const fetchPointsSystem = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPointsSystemEnabled(data.pointsSystemEnabled || false);
      } catch (err) {
        setError('Failed to fetch points system');
      }
    };
    fetchLeaderboard();
    fetchPointsSystem();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
          <div className="nav-links">
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Weekly Results
            </Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Player Stats
            </Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 0' }}>
        <h2 style={{ fontSize: '1.875rem', color: '#F5E8C7', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Leaderboard</h2>
        {error && <p style={{ color: '#C71585', textAlign: 'center' }}>{error}</p>}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#F5E8C7', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: pointsSystemEnabled ? '1fr 1fr 1fr' : '1fr 1fr', gap: '1rem' }}>
            <p style={{ color: '#3C2F2F', fontWeight: 'bold' }}>Player ID</p>
            <p style={{ color: '#3C2F2F', fontWeight: 'bold' }}>Total Points</p>
            {pointsSystemEnabled && <p style={{ color: '#3C2F2F', fontWeight: 'bold' }}>Points</p>}
          </div>
          {leaderboard.map((entry) => (
            <div key={entry.playerId} style={{ backgroundColor: '#F5E8C7', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: pointsSystemEnabled ? '1fr 1fr 1fr' : '1fr 1fr', gap: '1rem' }}>
              <p style={{ color: '#3C2F2F' }}>{entry.playerId}</p>
              <p style={{ color: '#3C2F2F' }}>{entry.totalPoints || 'N/A'}</p>
              {pointsSystemEnabled && <p style={{ color: '#3C2F2F' }}>{entry.points || '0'}</p>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}