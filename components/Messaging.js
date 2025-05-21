import { useState } from 'react';

export default function Messaging() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messaging`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Send Message</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Message (will be emailed to all players)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem', minHeight: '100px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}