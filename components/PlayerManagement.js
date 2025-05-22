import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { mockPlayers } from '../utils/mockData';

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [csvFile, setCsvFile] = useState(null);
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

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/players', { name, email });
      setPlayers([...players, res.data]);
      setName('');
      setEmail('');
      setError(null);
    } catch (err) {
      console.error('Add player error:', err.message);
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
          const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/players/upload', playersToUpload);
          setPlayers([...players, ...res.data]);
          setCsvFile(null);
          setError(null);
        },
        header: false,
      });
    } catch (err) {
      console.error('Upload CSV error:', err.message);
      setError('Error uploading CSV, please try again');
    }
  };

  return (
    <div className="admin-tab">
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