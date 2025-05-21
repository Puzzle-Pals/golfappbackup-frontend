import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messaging() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/players');
      setPlayers(response.data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPlayers(players.map(p => p.id));
    } else {
      setSelectedPlayers([]);
    }
  };

  const handlePlayerSelect = (id) => {
    setSelectedPlayers(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (selectedPlayers.length === 0) {
      setError('Please select at least one player');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/admin/messaging', {
        player_ids: selectedPlayers,
        message,
      });
      setSuccess('Message sent');
      setSelectedPlayers([]);
      setMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={selectedPlayers.length === players.length}
            onChange={handleSelectAll}
          />
          Select All
        </label>
        <button type="submit">Send Message</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedPlayers.includes(player.id)}
                  onChange={() => handlePlayerSelect(player.id)}
                />
              </td>
              <td>{player.name}</td>
              <td>{player.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Messaging;