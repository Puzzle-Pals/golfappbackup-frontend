"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RoundManagement() {
  const [rounds, setRounds] = useState([]);
  const [weekNumber, setWeekNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchRounds = async () => {
    try {
      const response = await api.get('/rounds');
      setRounds(response.data);
      setSuccess('Rounds fetched successfully');
    } catch (err) {
      setError('Failed to fetch rounds');
    }
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/rounds', { weekNumber: parseInt(weekNumber), date });
      setSuccess('Round added');
      setWeekNumber('');
      setDate(new Date());
      fetchRounds();
    } catch (err) {
      setError('Failed to add round');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this round?')) {
      try {
        await api.delete(`/rounds/${id}`);
        setSuccess('Round deleted');
        fetchRounds();
      } catch (err) {
        setError('Failed to delete round');
      }
    }
  };

  return (
    <div className="round-management">
      <h2 className="text-xl font-bold text-burnished-gold mb-4 font-cinzel">Manage Rounds</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={weekNumber}
          onChange={(e) => setWeekNumber(e.target.value)}
          placeholder="Week Number"
          required
        />
        <DatePicker
          selected={date}
          onChange={setDate}
          showTimeSelect
          dateFormat="Pp"
          required
        />
        <button type="submit">Add Round</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map(round => (
            <tr key={round._id}>
              <td>{round.weekNumber}</td>
              <td>{new Date(round.date).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(round._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}