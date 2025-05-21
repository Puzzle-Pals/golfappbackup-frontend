import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [csvFile, setCsvFile] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/admin/players/${editingId}`, { name, email });
        setSuccess('Player updated');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3000/api/admin/players', { name, email });
        setSuccess('Player added');
      }
      setName('');
      setEmail('');
      fetchPlayers();
    } catch (err) {
      setError('Failed to save player');
    }
  };

  const handleEdit = (player) => {
    setEditingId(player.id);
    setName(player.name);
    setEmail(player.email);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/players/${id}`);
        setSuccess('Player deleted');
        fetchPlayers();
      } catch (err) {
        setError('Failed to delete player');
      }
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setError('Please select a CSV file');
      return;
    }
    Papa.parse(csvFile, {
      complete: async (result) => {
        try {
          const csvData = result.data.map(row => ({ name: row.name, email: row.email }));
          const csvString = Papa.unparse(csvData);
          await axios.post('http://localhost:3000/api/admin/players/bulk', { csvData: csvString });
          setSuccess('Players uploaded');
          setCsvFile(null);
          fetchPlayers();
        } catch (err) {
          setError('Failed to upload CSV');
        }
      },
      header: true,
      error: () => setError('Failed to parse CSV'),
    });
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/players');
      const csv = Papa.unparse(response.data);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'players.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export players');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update Player' : 'Add Player'}</button>
      </form>
      <form onSubmit={handleCsvUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <button type="submit">Upload CSV</button>
      </form>
      <button onClick={handleExport}>Export Players</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.email}</td>
              <td>
                <button onClick={() => handleEdit(player)}>Edit</button>
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerManagement;