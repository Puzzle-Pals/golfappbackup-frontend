import { useState, useEffect } from 'react';
import axios from 'axios';
import { mockLeaderboard, mockScoringSystem } from '../utils/mockData';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointsSystem, setPointsSystem] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leaderboardRes, pointsRes] = await Promise.all([
          axios.get('https://bp-golf-app-backend.vercel.app/api/leaderboard', { timeout: 5000, retry: 3, retryDelay: 2000 }),
          axios.get('https://bp-golf-app-backend.vercel.app/api/scoring_system', { timeout: 5000, retry: 3, retryDelay: 2000 }),
        ]);
        setLeaderboard(leaderboardRes.data);
        setPointsSystem(pointsRes.data.pointsSystem);
      } catch (err) {
        console.error('Fetch leaderboard error:', err.message);
        setError('Unable to load leaderboard, showing sample data');
        setLeaderboard(mockLeaderboard);
        setPointsSystem(mockScoringSystem.pointsSystem);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Leaderboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#F5E8C7' }}>
        <thead>
          <tr style={{ backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Player</th>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Wins</th>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>2nd Place</th>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Highest Score</th>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Deuce Pot</th>
            <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Closest to Pin</th>
            {pointsSystem && <th style={{ padding: '10px', border: '1px solid #3C2F2F' }}>Points</th>}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player) => (
            <tr key={player.id}>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.name}</td>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.wins}</td>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.secondPlace}</td>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.highestScore}</td>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.deucePot}</td>
              <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.closestToPin}</td>
              {pointsSystem && <td style={{ padding: '10px', border: '1px solid #3C2F2F' }}>{player.points}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}