import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { mockPlayers } from '../../utils/mockData';

export default function AddWeek() {
  const [players, setPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [secondPlace, setSecondPlace] = useState([]);
  const [highestScore, setHighestScore] = useState([]);
  const [deucePot, setDeucePot] = useState([]);
  const [closestToPin, setClosestToPin] = useState([]);
  const [prizePool, setPrizePool] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await axios.get('https://bp-golf-app-backend.vercel.app/api/players', {
          timeout: 5000,
          retry: 3,
          retryDelay: 2000,
        });
        setPlayers(res.data);
      } catch (err) {
        console.error('Fetch players error:', err.message);
        setError('Unable to load players, showing sample data');
        setPlayers(mockPlayers);
      }
    }
    fetchPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/weekly_results', {
        winners,
        secondPlace,
        highestScore,
        deucePot,
        closestToPin,
        prizePool: parseFloat(prizePool),
      });
      alert('Week saved successfully');
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
      <Link href="/admin">
        <a style={{ display: 'inline-block', marginBottom: '10px' }}>Back to Admin</a>
      </Link>
      <h1>Add Week</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Winners:</label>
          <select multiple value={winners} onChange={(e) => setWinners(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.winners}</p>
        </div>
        <div>
          <label>2nd Place:</label>
          <select multiple value={secondPlace} onChange={(e) => setSecondPlace(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.secondPlace}</p>
        </div>
        <div>
          <label>Highest Score:</label>
          <select multiple value={highestScore} onChange={(e) => setHighestScore(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.highestScore}</p>
        </div>
        <div>
          <label>Deuce Pot:</label>
          <select multiple value={deucePot} onChange={(e) => setDeucePot(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.deucePot}</p>
        </div>
        <div>
          <label>Closest to Pin:</label>
          <select multiple value={closestToPin} onChange={(e) => setClosestToPin(Array.from(e.target.selectedOptions, (option) => option.value))}>
            {players.map((player) => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
          <p>Prize: ${prizes.closestToPin}</p>
        </div>
        <div>
          <label>Prize Pool ($):</label>
          <input
            type="number"
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Week</button>
      </form>
    </div>
  );
}