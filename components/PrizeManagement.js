"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function PrizeManagement() {
  const [payouts, setPayouts] = useState([]);
  const [results, setResults] = useState([]);
  const [weekId, setWeekId] = useState('');
  const [totalPrizePool, setTotalPrizePool] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const [payoutsRes, resultsRes] = await Promise.all([
        api.get('/prizes'),
        api.get('/results'),
      ]);
      setPayouts(payoutsRes.data);
      setResults(resultsRes.data);
      setSuccess('Prize data fetched');
    } catch (err) {
      setError('Failed to fetch prize data');
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
      const total = parseFloat(totalPrizePool);
      await api.post('/prizes', {
        weekId,
        totalPrizePool: total,
        winnersAmount: total * 0.3,
        secondPlaceAmount: total * 0.2,
        deucePotAmount: total * 0.2,
        closestToPinAmount: total * 0.2,
        highestScoreAmount: total * 0.1,
      });
      setSuccess('Prize payout added');
      setWeekId('');
      setTotalPrizePool('');
      fetchData();
    } catch (err) {
      setError('Failed to add prize payout');
    }
  };

  return (
    <div className="prize-management">
      <h2 className="text-xl font-bold text-burnished-gold mb-4 font-cinzel">Manage Prizes</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={weekId}
          onChange={(e) => setWeekId(e.target.value)}
          required
        >
          <option value="">Select Week</option>
          {results.map(result => (
            <option key={result._id} value={result._id}>
              Week {result.weekNumber} - {new Date(result.date).toLocaleDateString()}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Total Prize Pool ($)"
          value={totalPrizePool}
          onChange={(e) => setTotalPrizePool(e.target.value)}
          step="0.01"
          required
        />
        <button type="submit">Add Payout</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Total Pool</th>
            <th>Winners (30%)</th>
            <th>2nd Place (20%)</th>
            <th>Deuce Pot (20%)</th>
            <th>Closest to Pin (20%)</th>
            <th>Highest Score (10%)</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map(payout => (
            <tr key={payout._id}>
              <td>{payout.weekNumber}</td>
              <td>${payout.totalPrizePool.toFixed(2)}</td>
              <td>${payout.winnersAmount.toFixed(2)}</td>
              <td>${payout.secondPlaceAmount.toFixed(2)}</td>
              <td>${payout.deucePotAmount.toFixed(2)}</td>
              <td>${payout.closestToPinAmount.toFixed(2)}</td>
              <td>${payout.highestScoreAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}