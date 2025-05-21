import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch leaderboard data
        const leaderboardRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results/leaderboard`);
        if (!leaderboardRes.ok) throw new Error('Failed to fetch leaderboard');
        const leaderboardData = await leaderboardRes.json();

        // Fetch player data to map IDs to names
        const playersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
        if (!playersRes.ok) throw new Error('Failed to fetch players');
        const playersData = await playersRes.json();

        // Combine data
        const combinedData = leaderboardData.map(item => {
          const player = playersData.find(p => p.id === item.playerId);
          return {
            ...item,
            playerName: player ? player.name : `Player ${item.playerId}`,
            handicap: player ? player.handicap : null
          };
        }).sort((a, b) => b.totalPoints - a.totalPoints);

        setLeaderboard(combinedData);
        setPlayers(playersData);
        setError('');
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <h2 style={{ fontSize: '1.875rem', color: '#F5E8C7', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Leaderboard</h2>
        
        {loading && (
          <p style={{ color: '#F5E8C7', textAlign: 'center' }}>Loading leaderboard...</p>
        )}
        
        {error && (
          <p style={{ color: '#C71585', textAlign: 'center' }}>{error}</p>
        )}
        
        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#F5E8C7', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#3C2F2F', color: '#F5E8C7' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Rank</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Player</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Handicap</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Total Points</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Rounds Played</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.playerId} style={{ borderBottom: '1px solid #3C2F2F' }}>
                    <td style={{ padding: '1rem' }}>{index + 1}</td>
                    <td style={{ padding: '1rem' }}>{entry.playerName}</td>
                    <td style={{ padding: '1rem' }}>{entry.handicap || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{entry.totalPoints}</td>
                    <td style={{ padding: '1rem' }}>{entry.roundsPlayed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}