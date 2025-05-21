import axios from 'axios';
import { useState } from 'react';

export default function Messaging() {
  const [message, setMessage] = useState({ subject: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/messaging', message)
      .then(() => {
        alert('Message sent!');
        setMessage({ subject: '', content: '' });
      })
      .catch(err => console.error('Send error:', err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Messaging</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message.subject}
          onChange={(e) => setMessage({...message, subject: e.target.value})}
          placeholder="Subject"
          required
          style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%' }}
        />
        <textarea
          value={message.content}
          onChange={(e) => setMessage({...message, content: e.target.value})}
          placeholder="Message content"
          required
          style={{ display: 'block', marginBottom: '0.5rem', padding: '0.5rem', width: '100%', minHeight: '100px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}