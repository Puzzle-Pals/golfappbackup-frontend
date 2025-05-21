import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PrizePayouts() {
  const [payouts, setPayouts] = useState([]);
  const [results, setResults] = useState([]);
  const [weeklyResultId, setWeeklyResultId] = useState('');
  const [totalPrizePool, setTotalPrizePool] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const [payoutsRes, resultsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/admin/prize_payouts'),
        axios.get('http://localhost:3000/api/admin/weekly_results'),
      ]);
      setPayouts(payoutsRes.data);
      setResults(resultsRes.data);
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
      await axios.post('http://localhost:3000/api/admin/prize_payouts', {
        weekly_result_id: parseInt(weeklyResultId),
        total_prize_pool: parseFloat(totalPrizePool),
      });
      setSuccess('Prize payout added');
      setWeeklyResultId('');
      setTotalPrizePool('');
      fetchData();
    } catch (err) {
      setError('Failed to add prize payout');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={weeklyResultId}
          onChange={(e) => setWeeklyResultId(e.target.value)}
          required
        >
          <option value="">Select Weekly Result</option>
          {results.map(result => (
            <option key={result.id} value={result.id}>
              Week {result.week_number} - {result.date}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Total Prize Pool"
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
            <th>Date</th>
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
            <tr key={payout.id}>
              <td>{payout.week_number}</td>
              <td>{payout.date}</td>
              <td>${payout.total_prize_pool.toFixed(2)}</td>
              <td>${payout.winners_amount.toFixed(2)}</td>
              <td>${payout.second_place_amount.toFixed(2)}</td>
              <td>${payout.deuce_pot_amount.toFixed(2)}</td>
              <td>${payout.closest_to_pin_amount.toFixed(2)}</td>
              <td>${payout.highest_score_amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrizePayouts;