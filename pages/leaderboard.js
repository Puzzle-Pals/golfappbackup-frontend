import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointsSystem, setPointsSystem] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leaderboardRes, pointsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`),
        ]);
        if (!leaderboardRes.ok || !pointsRes.ok) throw new Error('Failed to fetch data');
        const leaderboardData = await leaderboardRes.json();
        const pointsData = await pointsRes.json();
        setLeaderboard(leaderboardData);
        setPointsSystem(pointsData.pointsSystem);
      } catch (err) {
        setError('Error loading leaderboard, please try again');
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Leaderboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Player</th>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Wins</th>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>2nd Place</th>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Highest Score</th>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Deuce Pot</th>
            <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Closest to Pin</th>
            {pointsSystem && <th style={{ padding: '8px', border: '1px solid #3C2F2F' }}>Points</th>}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player) => (
            <tr key={player.id} style={{ backgroundColor: '#F5E8C7' }}>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.name}</td>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.wins}</td>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.secondPlace}</td>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.highestScore}</td>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.deucePot}</td>
              <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.closestToPin}</td>
              {pointsSystem && <td style={{ padding: '8px', border: '1px solid #3C2F2F' }}>{player.points}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}