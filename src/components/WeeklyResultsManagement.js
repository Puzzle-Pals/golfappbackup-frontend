import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [players, setPlayers] = useState([]);
  const [weeklyRoundId, setWeeklyRoundId] = useState('');
  const [winner1Id, setWinner1Id] = useState('');
  const [winner2Id, setWinner2Id] = useState('');
  const [secondPlace1Id, setSecondPlace1Id] = useState('');
  const [secondPlace2Id, setSecondPlace2Id] = useState('');
  const [deucePot1Id, setDeucePot1Id] = useState('');
  const [deucePot2Id, setDeucePot2Id] = useState('');
  const [closestToPinId, setClosestToPinId] = useState('');
  const [highestScoreId, setHighestScoreId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const [resultsRes, roundsRes, playersRes] = await Promise.all([
        axios.get('http://localhost:3000/api/admin/weekly_results'),
        axios.get('http://localhost:3000/api/admin/weekly_rounds'),
        axios.get('http://localhost:3000/api/admin/players'),
      ]);
      setResults(resultsRes.data);
      setRounds(roundsRes.data);
      setPlayers(playersRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3000/api/admin/weekly_results', {
        weekly_round_id: parseInt(weeklyRoundId),
        winner1_id: winner1Id ? parseInt(winner1Id) : null,
        winner2_id: winner2Id ? parseInt(winner2Id) : null,
        second_place1_id: secondPlace1Id ? parseInt(secondPlace1Id) : null,
        second_place2_id: secondPlace2Id ? parseInt(secondPlace2Id) : null,
        deuce_pot1_id: deucePot1Id ? parseInt(deucePot1Id) : null,
        deuce_pot2_id: deucePot2Id ? parseInt(deucePot2Id) : null,
        closest_to_pin_id: closestToPinId ? parseInt(closestToPinId) : null,
        highest_score_id: highestScoreId ? parseInt(highestScoreId) : null,
      });
      setSuccess('Results added');
      setWeeklyRoundId('');
      setWinner1Id('');
      setWinner2Id('');
      setSecondPlace1Id('');
      setSecondPlace2Id('');
      setDeucePot1Id('');
      setDeucePot2Id('');
      setClosestToPinId('');
      setHighestScoreId('');
      fetchData();
    } catch (err) {
      setError('Failed to add results');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={weeklyRoundId}
          onChange={(e) => setWeeklyRoundId(e.round.value)}
          required
        >
          <option value="">Select Week</option>
          {rounds.map(round => (
            <option key={round.id} value={round.id}>
              Week {round.week_number} - {round.date}
            </option>
          ))}
        </select>
        <select
          value={winner1Id}
          onChange={(e) => setWinner1Id(e.target.value)}
        >
          <option value="">Winner 1</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={winner2Id}
          onChange={(e) => setWinner2Id(e.target.value)}
        >
          <option value="">Winner 2</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={secondPlace1Id}
          onChange={(e) => setSecondPlace1Id(e.target.value)}
        >
          <option value="">2nd Place 1</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={secondPlace2Id}
          onChange={(e) => setSecondPlace2Id(e.target.value)}
        >
          <option value="">2nd Place 2</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={deucePot1Id}
          onChange={(e) => setDeucePot1Id(e.target.value)}
        >
          <option value="">Deuce Pot 1</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={deucePot2Id}
          onChange={(e) => setDeucePot2Id(e.target.value)}
        >
          <option value="">Deuce Pot 2</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={closestToPinId}
          onChange={(e) => setClosestToPinId(e.target.value)}
        >
          <option value="">Closest to Pin</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <select
          value={highestScoreId}
          onChange={(e) => setHighestScoreId(e.target.value)}
        >
          <option value="">Highest Score</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <button type="submit">Save Results</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Winners</th>
            <th>2nd Place</th>
            <th>Deuce Pot</th>
            <th>Closest to Pin</th>
            <th>Highest Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.week_number}</td>
              <td>{result.date}</td>
              <td>{result.winner1_name || '-'}, {result.winner2_name || '-'}</td>
              <td>{result.second_place1_name || '-'}, {result.second_place2_name || '-'}</td>
              <td>{result.deuce_pot1_name || '-'}, {result.deuce_pot2_name || '-'}</td>
              <td>{result.closest_to_pin_name || '-'}</td>
              <td>{result.highest_score_name || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyResultsManagement;