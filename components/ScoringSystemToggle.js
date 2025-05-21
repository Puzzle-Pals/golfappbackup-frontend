import axios from 'axios';
import { useState, useEffect } from 'react';

export default function ScoringSystemToggle() {
  const [system, setSystem] = useState('');

  useEffect(() => {
    axios.get('/api/scoring_system')
      .then(res => setSystem(res.data.system))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleToggle = () => {
    const newSystem = system === 'stableford' ? 'stroke' : 'stableford';
    axios.post('/api/scoring_system', { system: newSystem })
      .then(() => setSystem(newSystem))
      .catch(err => console.error('Update error:', err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Scoring System</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '1rem' }}>Current: {system}</span>
        <button onClick={handleToggle} style={{ padding: '0.5rem 1rem' }}>
          Toggle System
        </button>
      </div>
    </div>
  );
}