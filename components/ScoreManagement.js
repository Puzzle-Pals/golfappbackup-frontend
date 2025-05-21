import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function ScoreManagement() {
  const [scores, setScores] = useState([]);
  const [eventId, setEventId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [score, setScore] = useState('');
  const [editId, setEditId] = useState(null);
  const [events, setEvents] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchScores();
    fetchEvents();
    fetchPlayers();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await api.get('/scores');
      setScores(response.data);
    } catch (err) {
      setError('Failed to fetch scores');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await api.get('/players');
      setPlayers(response.data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = { eventId, playerId, score: parseInt(score) };
      if (editId) {
        await api.put(`/scores/${editId}`, data);
        setSuccess('Score updated');
        setEditId(null);
      } else {
        await api.post('/scores', data);
        setSuccess('Score added');
      }
      setEventId('');
      setPlayerId('');
      setScore('');
      fetchScores();
    } catch (err) {
      setError('Failed to save score');
    }
  };

  const handleEdit = (score) => {
    setEditId(score._id);
    setEventId(score.eventId);
    setPlayerId(score.playerId);
    setScore(score.score.toString());
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/scores/${id}`);
      setSuccess('Score deleted');
      fetchScores();
    } catch (err) {
      setError('Failed to delete score');
    }
  };

  return (
    <div className="score-management">
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Manage Scores</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="mb-4 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>{event.name}</option>
          ))}
        </select>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="mb-4 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        >
          <option value="">Select Player</option>
          {players.map((player) => (
            <option key={player._id} value={player._id}>{player.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Score"
          className="mb-4 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          {editId ? 'Update' : 'Add'} Score
        </button>
        {error && <p className="text-azalea-pink mt-4 font-lato">{error}</p>}
        {success && <p className="text-augusta-green mt-4 font-lato">{success}</p>}
      </form>
      <div className="scores-list">
        {scores.map((score) => (
          <div key={score._id} className="mb-6 p-6 bg-pine-brown border-2 border-sky-blue rounded-lg">
            <p className="text-magnolia-cream font-lato">
              {events.find(e => e._id === score.eventId)?.name || 'Unknown Event'} - 
              {players.find(p => p._id === score.playerId)?.name || 'Unknown Player'}: {score.score}
            </p>
            <div className="mt-4 flex space-x-4">
              <button onClick={() => handleEdit(score)} className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato hover:bg-sky-blue hover:text-magnolia-cream">
                Edit
              </button>
              <button onClick={() => handleDelete(score._id)} className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato hover:bg-sky-blue hover:text-magnolia-cream">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}