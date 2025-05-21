import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [players, setPlayers] = useState([]);
  const [newResult, setNewResult] = useState({ roundId: '', playerId: '', score: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
    fetchRounds();
    fetchPlayers();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/weekly_results', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setResults(response.data);
    } catch (err) {
      setError('Error fetching results');
    }
  };

  const fetchRounds = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/weekly_rounds', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setRounds(response.data);
    } catch (err) {
      setError('Error fetching rounds');
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/players', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setPlayers(response.data);
    } catch (err) {
      setError('Error fetching players');
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/weekly_results', newResult, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setResults([...results, response.data]);
      setNewResult({ roundId: '', playerId: '', score: '' });
    } catch (err) {
      setError('Error adding result');
    }
  };

  const handleDeleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/weekly_results/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setResults(results.filter(result => result._id !== id));
    } catch (err) {
      setError('Error deleting result');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Weekly Results Management</h2>
      <form onSubmit={handleAddResult} className="mb-6">
        <select
          value={newResult.roundId}
          onChange={(e) => setNewResult({ ...newResult, roundId: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        >
          <option value="">Select Round</option>
          {rounds.map(round => (
            <option key={round._id} value={round._id}>{round.course} - {new Date(round.date).toLocaleDateString()}</option>
          ))}
        </select>
        <select
          value={newResult.playerId}
          onChange={(e) => setNewResult({ ...newResult, playerId: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        >
          <option value="">Select Player</option>
          {players.map(player => (
            <option key={player._id} value={player._id}>{player.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Score"
          value={newResult.score}
          onChange={(e) => setNewResult({ ...newResult, score: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          Add Result
        </button>
      </form>
      {error && <p className="text-azalea-pink mb-4 font-lato">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Player</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result._id}>
              <td>{result.roundId?.course}</td>
              <td>{result.playerId?.name}</td>
              <td>{result.score}</td>
              <td>
                <button
                  onClick={() => handleDeleteResult(result._id)}
                  className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}