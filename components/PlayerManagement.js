import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
        if (!res.ok) throw new Error('Failed to fetch players');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        setError('Error loading players, please try again');
      }
    }
    fetchPlayers();
  }, []);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error('Failed to add player');
      const newPlayer = await res.json();
      setPlayers([...players, newPlayer]);
      setName('');
      setEmail('');
      setError(null);
    } catch (err) {
      setError('Error adding player, please try again');
    }
  };

  const handleUploadCSV = async (e) => {
    e.preventDefault();
    if (!csvFile) return;
    try {
      Papa.parse(csvFile, {
        complete: async (result) => {
          const playersToUpload = result.data.map((row) => ({
            name: row[0],
            email: row[1],
          }));
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playersToUpload),
          });
          if (!res.ok) throw new Error('Failed to upload CSV');
          const newPlayers = await res.json();
          setPlayers([...players, ...newPlayers]);
          setCsvFile(null);
          setError(null);
        },
        header: false,
      });
    } catch (err) {
      setError('Error uploading CSV, please try again');
    }
  };

  return (
    <div>
      <h2>Players</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Add Player</button>
      </form>
      <form onSubmit={handleUploadCSV}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <button type="submit">Upload CSV</button>
      </form>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name} - {player.email}</li>
        ))}
      </ul>
    </div>
  );
}