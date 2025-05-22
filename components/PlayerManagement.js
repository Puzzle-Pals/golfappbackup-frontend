import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlayer),
      });
      if (!res.ok) throw new Error('Failed to add player');
      setNewPlayer({ name: '', email: '' });
      fetchPlayers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete player');
      fetchPlayers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to upload');
      setFile(null);
      fetchPlayers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/export`);
      if (!res.ok) throw new Error('Failed to export');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'players.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Manage Players</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Name</label>
          <input
            type="text"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Email</label>
          <input
            type="email"
            value={newPlayer.email}
            onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
        >
          Add Player
        </button>
      </form>
      <form onSubmit={handleFileUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Upload CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
        >
          Upload CSV
        </button>
      </form>
      <button
        onClick={handleExport}
        style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
        onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
      >
        Export Players
      </button>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>Existing Players</h3>
        {players.map((player) => (
          <div key={player.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5E8C7', padding: '1rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#3C2F2F' }}>
              {player.name} ({player.email})
            </span>
            <button
              onClick={() => handleDelete(player.id)}
              style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}