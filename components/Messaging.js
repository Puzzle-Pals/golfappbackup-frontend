import { useState, useEffect } from 'react';
import axios from 'axios';
import { mockPlayers } from '../utils/mockData';

export default function Messaging() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const validEmails = players
        .filter((player) => player.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(player.email))
        .map((player) => player.email);
      if (validEmails.length === 0) {
        setError('No valid email addresses found');
        return;
      }
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/messaging', {
        emails: validEmails,
        message,
      });
      alert('Message sent successfully');
      setMessage('');
      setError(null);
    } catch (err) {
      console.error('Send message error:', err.message);
      setError('Error sending message, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>Messaging</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSendMessage}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}