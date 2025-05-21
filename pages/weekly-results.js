import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError('Failed to fetch weekly results. Please try again later.');
        console.error('Fetch error:', err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold' }}>BP Golf League</h1>
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
        <h2 style={{ fontSize: '1.875rem', color: '#F5E8C7', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Weekly Results</h2>
        {error && <p style={{ color: '#C71585', textAlign: 'center' }}>{error}</p>}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {results.map((result) => (
            <div key={result.id} style={{ backgroundColor: '#F5E8C7', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#3C2F2F' }}>Round ID: {result.roundId}</p>
              <p style={{ color: '#3C2F2F' }}>Player ID: {result.playerId}</p>
              <p style={{ color: '#3C2F2F' }}>Score: {result.score}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}