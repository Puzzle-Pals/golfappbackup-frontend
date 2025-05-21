import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: '', email: '', handicap: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/players/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/players`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newPlayer),
      });
      
      if (!res.ok) throw new Error(editingId ? 'Failed to update player' : 'Failed to add player');
      
      setSuccess(editingId ? 'Player updated successfully' : 'Player added successfully');
      setNewPlayer({ name: '', email: '', handicap: '' });
      setEditingId(null);
      fetchPlayers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (player) => {
    setNewPlayer({
      name: player.name,
      email: player.email,
      handicap: player.handicap || ''
    });
    setEditingId(player.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      if (!res.ok) throw new Error('Failed to delete player');
      
      setSuccess('Player deleted successfully');
      fetchPlayers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      
      if (!res.ok) throw new Error('Failed to import players');
      
      setSuccess('Players imported successfully');
      fetchPlayers();
      setFile(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players/export`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      if (!res.ok) throw new Error('Failed to export players');
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'players.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Player Management</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#FFEBEE', 
          color: '#C62828', 
          padding: '1rem', 
          borderRadius: '0.25rem' 
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          backgroundColor: '#E8F5E9', 
          color: '#2E7D32', 
          padding: '1rem', 
          borderRadius: '0.25rem' 
        }}>
          {success}
        </div>
      )}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr'
        }
      }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>
            {editingId ? 'Edit Player' : 'Add New Player'}
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#3C2F2F', marginBottom: '0.25rem' }}>Name</label>
              <input
                type="text"
                name="name"
                value={newPlayer.name}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #3C2F2F', 
                  borderRadius: '0.25rem' 
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#3C2F2F', marginBottom: '0.25rem' }}>Email</label>
              <input
                type="email"
                name="email"
                value={newPlayer.email}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #3C2F2F', 
                  borderRadius: '0.25rem' 
                }}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#3C2F2F', marginBottom: '0.25rem' }}>Handicap</label>
              <input
                type="number"
                name="handicap"
                value={newPlayer.handicap}
                onChange={handleInputChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #3C2F2F', 
                  borderRadius: '0.25rem' 
                }}
              />
            </div>
            
            <button
              type="submit"
              style={{ 
                backgroundColor: '#C71585', 
                color: '#F5E8C7', 
                padding: '0.75rem', 
                borderRadius: '0.25rem', 
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => { 
                e.target.style.backgroundColor = '#87CEEB'; 
                e.target.style.color = '#3C2F2F'; 
              }}
              onMouseOut={(e) => { 
                e.target.style.backgroundColor = '#C71585'; 
                e.target.style.color = '#F5E8C7'; 
              }}
            >
              {editingId ? 'Update Player' : 'Add Player'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setNewPlayer({ name: '', email: '', handicap: '' });
                  setEditingId(null);
                }}
                style={{ 
                  backgroundColor: '#3C2F2F', 
                  color: '#F5E8C7', 
                  padding: '0.75rem', 
                  borderRadius: '0.25rem', 
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => { 
                  e.target.style.backgroundColor = '#87CEEB'; 
                  e.target.style.color = '#3C2F2F'; 
                }}
                onMouseOut={(e) => { 
                  e.target.style.backgroundColor = '#3C2F2F'; 
                  e.target.style.color = '#F5E8C7'; 
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>
            Import/Export Players
          </h3>
          
          <form onSubmit={handleImport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#3C2F2F', marginBottom: '0.25rem' }}>CSV File</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  border: '1px solid #3C2F2F', 
                  borderRadius: '0.25rem' 
                }}
                required
              />
            </div>
            
            <button
              type="submit"
              style={{ 
                backgroundColor: '#3C2F2F', 
                color: '#F5E8C7', 
                padding: '0.75rem', 
                borderRadius: '0.25rem', 
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => { 
                e.target.style.backgroundColor = '#87CEEB'; 
                e.target.style.color = '#3C2F2F'; 
              }}
              onMouseOut={(e) => { 
                e.target.style.backgroundColor = '#3C2F2F'; 
                e.target.style.color = '#F5E8C7'; 
              }}
            >
              Import Players
            </button>
          </form>
          
          <button
            onClick={handleExport}
            style={{ 
              backgroundColor: '#3C2F2F', 
              color: '#F5E8C7', 
              padding: '0.75rem', 
              borderRadius: '0.25rem', 
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => { 
              e.target.style.backgroundColor = '#87CEEB'; 
              e.target.style.color = '#3C2F2F'; 
            }}
            onMouseOut={(e) => { 
              e.target.style.backgroundColor = '#3C2F2F'; 
              e.target.style.color = '#F5E8C7'; 
            }}
          >
            Export Players
          </button>
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>
          Current Players ({players.length})
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            backgroundColor: 'white', 
            borderRadius: '0.25rem', 
            overflow: 'hidden' 
          }}>
            <thead>
              <tr style={{ backgroundColor: '#3C2F2F', color: '#F5E8C7' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Handicap</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
                  <td style={{ padding: '1rem' }}>{player.name}</td>
                  <td style={{ padding: '1rem' }}>{player.email}</td>
                  <td style={{ padding: '1rem' }}>{player.handicap || 'N/A'}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(player)}
                        style={{ 
                          backgroundColor: '#2196F3', 
                          color: 'white', 
                          padding: '0.5rem', 
                          borderRadius: '0.25rem', 
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#0D47A1'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = '#2196F3'; }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
                        style={{ 
                          backgroundColor: '#F44336', 
                          color: 'white', 
                          padding: '0.5rem', 
                          borderRadius: '0.25rem', 
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => { e.target.style.backgroundColor = '#B71C1C'; }}
                        onMouseOut={(e) => { e.target.style.backgroundColor = '#F44336'; }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}