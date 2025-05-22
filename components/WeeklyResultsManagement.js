import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { mockWeeklyResults, mockScoringSystem } from '../utils/mockData';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [pointsSystem, setPointsSystem] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resultsRes, pointsRes] = await Promise.all([
          axios.get('https://bp-golf-app-backend.vercel.app/api/weekly_results', { timeout: 5000, retry: 3, retryDelay: 2000 }),
          axios.get('https://bp-golf-app-backend.vercel.app/api/scoring_system', { timeout: 5000, retry: 3, retryDelay: 2000 }),
        ]);
        setResults(resultsRes.data);
        setPointsSystem(pointsRes.data.pointsSystem);
      } catch (err) {
        console.error('Fetch results error:', err.message);
        setError('Unable to load results, showing sample data');
        setResults(mockWeeklyResults);
        setPointsSystem(mockScoringSystem.pointsSystem);
      }
    }
    fetchData();
  }, []);

  const togglePointsSystem = async () => {
    try {
      const res = await axios.put('https://bp-golf-app-backend.vercel.app/api/scoring_system', {
        pointsSystem: !pointsSystem,
      });
      setPointsSystem(!pointsSystem);
      setError(null);
    } catch (err) {
      console.error('Toggle points system error:', err.message);
      setError('Error updating points system, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>Weekly Results</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Points System:
        <input
          type="checkbox"
          checked={pointsSystem}
          onChange={togglePointsSystem}
        />
      </label>
      <Link href="/admin/add-week">
        <a style={{ display: 'inline-block', margin: '10px 0' }}>Add Week</a>
      </Link>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            Week {result.weekNumber}:<br />
            Winners: {result.winners.join(', ')} (Score: {result.winnersScore}) - ${result.prizes.winners}<br />
            2nd Place: {result.secondPlace.join(', ')} (Score: {result.secondPlaceScore}) - ${result.prizes.secondPlace}<br />
            Highest Score: {result.highestScore.join(', ')} (Score: {result.highestScoreScore}) - ${result.prizes.highestScore}<br />
            Deuce Pot: {result.deucePot} - ${result.prizes.deucePot}<br />
            Closest to Pin: {result.closestToPin} - ${result.prizes.closestToPin}<br />
            Prize Pool: ${result.prizePool}
          </li>
        ))}
      </ul>
    </div>
  );
}