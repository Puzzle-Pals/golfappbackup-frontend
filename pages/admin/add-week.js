import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { mockPlayers } from '../../utils/mockData';

export default function AddWeek() {
  const [players, setPlayers] = useState([]);
  const [weekNumber, setWeekNumber] = useState(1);
  const [winners, setWinners] = useState(['', '']);
  const [winnersScore, setWinnersScore] = useState('');
  const [secondPlace, setSecondPlace] = useState(['', '']);
  const [secondPlaceScore, setSecondPlaceScore] = useState('');
  const [highestScore, setHighestScore] = useState(['', '']);
  const [highestScoreScore, setHighestScoreScore] = useState('');
  const [deucePot, setDeucePot] = useState('');
  const [closestToPin, setClosestToPin] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersRes, resultsRes] = await Promise.all([
          axios.get('https://bp-golf-app-backend.vercel.app/api/players', { timeout: 5000, retry: 3, retryDelay: 2000 }),
          axios.get('https://bp-golf-app-backend.vercel.app/api/weekly_results', { timeout: 5000, retry: 3, retryDelay: 2000 }),
        ]);
        setPlayers(playersRes.data);
        const latestWeek = resultsRes.data.length > 0 ? Math.max(...resultsRes.data.map(r => r.weekNumber)) + 1 : 1;
        setWeekNumber(latestWeek);
      } catch (err) {
        console.error('Fetch data error:', err.message);
        setError('Unable to load players, showing sample data');
        setPlayers(mockPlayers);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/weekly_results', {
        weekNumber,
        winners,
        winnersScore: parseInt(winnersScore),
        secondPlace,
        secondPlaceScore: parseInt(secondPlaceScore),
        highestScore,
        highestScoreScore: parseInt(highestScoreScore),
        deucePot,
        closestToPin,
        prizePool: parseFloat(prizePool),
        prizes: calculatePrizes(),
      });
      alert('Week saved successfully');
      setWeekNumber(weekNumber + 1);
      setWinners(['', '']);
      setWinnersScore('');
      setSecondPlace(['', '']);
      setSecondPlaceScore('');
      setHighestScore(['', '']);
      setHighestScoreScore('');
      setDeucePot('');
      setClosestToPin('');
      setPrizePool('');
      setError(null);
    } catch (err) {
      console.error('Save week error:', err.message);
      setError('Error saving week, please try again');
    }
  };

  const calculatePrizes = () => {
    const total = parseFloat(prizePool) || 0;
    return {
      winners: (total * 0.3).toFixed(2),
      secondPlace: (total * 0.2).toFixed(2),
      highestScore: (total * 0.1).toFixed(2),
      deucePot: (total * 0.2).toFixed(2),
      closestToPin: (total * 0.2).toFixed(2),
    };
  };

  const prizes = calculatePrizes();

  return (
    <div className="admin-tab">
      <Link href="/admin"><a style={{ display: 'inline-block', marginBottom: '10px' }}>Back to Admin</a></Link>
      <h1>Add Week {weekNumber}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Prize Pool ($):</label>
          <input
            type="number"
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Winners:</label>
          <select value={winners[0]} onChange={(e) => setWinners([e.target.value, winners[1]])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <select value={winners[1]} onChange={(e) => setWinners([winners[0], e.target.value])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={winnersScore}
            onChange={(e) => setWinnersScore(e.target.value)}
            placeholder="Score"
            required
          />
          <p>Prize: ${prizes.winners}</p>
        </div>
        <div>
          <label>2nd Place:</label>
          <select value={secondPlace[0]} onChange={(e) => setSecondPlace([e.target.value, secondPlace[1]])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <select value={secondPlace[1]} onChange={(e) => setSecondPlace([secondPlace[0], e.target.value])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={secondPlaceScore}
            onChange={(e) => setSecondPlaceScore(e.target.value)}
            placeholder="Score"
            required
          />
          <p>Prize: ${prizes.secondPlace}</p>
        </div>
        <div>
          <label>Highest Score:</label>
          <select value={highestScore[0]} onChange={(e) => setHighestScore([e.target.value, highestScore[1]])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <select value={highestScore[1]} onChange={(e) => setHighestScore([highestScore[0], e.target.value])}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={highestScoreScore}
            onChange={(e) => setHighestScoreScore(e.target.value)}
            placeholder="Score"
            required
          />
          <p>Prize: ${prizes.highestScore}</p>
        </div>
        <div>
          <label>Deuce Pot:</label>
          <select value={deucePot} onChange={(e) => setDeucePot(e.target.value)}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.deucePot}</p>
        </div>
        <div>
          <label>Closest to Pin:</label>
          <select value={closestToPin} onChange={(e) => setClosestToPin(e.target.value)}>
            <option value="">Select Player</option>
            {players.map((player) => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.closestToPin}</p>
        </div>
        <button type="submit">Save Week</button>
      </form>
    </div>
  );
}