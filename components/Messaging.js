import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Messaging() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState({ recipients: [], subject: '', body: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/messaging', {
        recipients: message.recipients,
        subject: message.subject,
        message: message.body
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setSuccess('Message sent successfully');
      setMessage({ recipients: [], subject: '', body: '' });
    } catch (err) {
      setError('Error sending message');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Messaging</h2>
      <form onSubmit={handleSendMessage} className="mb-6">
        <select
          multiple
          value={message.recipients}
          onChange={(e) => setMessage({ ...message, recipients: Array.from(e.target.selectedOptions, option => option.value) })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        >
          {players.map(player => (
            <option key={player._id} value={player.email}>{player.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={message.subject}
          onChange={(e) => setMessage({ ...message, subject: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <textarea
          placeholder="Message"
          value={message.body}
          onChange={(e) => setMessage({ ...message, body: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          rows="5"
          required
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          Send Message
        </button>
      </form>
      {error && <p className="text-azalea-pink mb-4 font-lato">{error}</p>}
      {success && <p className="text-augusta-green mb-4 font-lato">{success}</p>}
    </div>
  );
}