"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function MessageForm() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPlayers = async () => {
    try {
      const response = await api.get('/players');
      setPlayers(response.data);
      setSuccess('Players fetched for messaging');
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSelectAll = (e) => {
    setError('');
    setSuccess('');
    if (e.target.checked) {
      setSelectedPlayers(players.map(p => p._id));
    } else {
      setSelectedPlayers([]);
    }
  };

  const handleSelectPlayer = (id) => {
    setError('');
    setSuccess('');
    setSelectedPlayers(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/messages', { playerIds: selectedPlayers, subject, message });
      setSuccess('Message sent successfully');
      setSelectedPlayers([]);
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="message-form">
      <h2 className="text-xl font-bold text-burnished-gold mb-4 font-cinzel">Send Messages</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={selectedPlayers.length === players.length && players.length > 0}
            onChange={handleSelectAll}
          />
          Select All
        </label>
        <div className="player-list">
          {players.map(player => (
            <label key={player._id}>
              <input
                type="checkbox"
                checked={selectedPlayers.includes(player._id)}
                onChange={() => handleSelectPlayer(player._id)}
              />
              {player.name} ({player.email})
            </label>
          ))}
        </div>
        <button type="submit">Send Message</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}