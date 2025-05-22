import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [pointsSystem, setPointsSystem] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resultsRes, pointsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`),
        ]);
        if (!resultsRes.ok || !pointsRes.ok) throw new Error('Failed to fetch data');
        const resultsData = await resultsRes.json();
        const pointsData = await pointsRes.json();
        setResults(resultsData);
        setPointsSystem(pointsData.pointsSystem);
      } catch (err) {
        setError('Error loading results, please try again');
      }
    }
    fetchData();
  }, []);

  const togglePointsSystem = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pointsSystem: !pointsSystem }),
      });
      if (!res.ok) throw new Error('Failed to update points system');
      setPointsSystem(!pointsSystem);
      setError(null);
    } catch (err) {
      setError('Error updating points system, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>Weekly Results</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={togglePointsSystem}>
        {pointsSystem ? 'Disable Points System' : 'Enable Points System'}
      </button>
      <Link href="/admin/add-week">
        <a style={{ display: 'inline-block', margin: '10px 0' }}>Add Week</a>
      </Link>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            Winners: {result.winners.join(', ')} - ${result.prizes.winners}
            <br />
            2nd Place: {result.secondPlace.join(', ')} - ${result.prizes.secondPlace}
            <br />
            Highest Score: {result.highestScore.join(', ')} - ${result.prizes.highestScore}
            <br />
            Deuce Pot: {result.deucePot.join(', ')} - ${result.prizes.deucePot}
            <br />
            Closest to Pin: {result.closestToPin.join(', ')} - ${result.prizes.closestToPin}
          </li>
        ))}
      </ul>
    </div>
  );
}