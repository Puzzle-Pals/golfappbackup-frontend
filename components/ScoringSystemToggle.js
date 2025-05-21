import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ScoringSystemToggle() {
  const [system, setSystem] = useState('Stableford');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSystem();
  }, []);

  const fetchSystem = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/scoring_system', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setSystem(response.data.system);
    } catch (err) {
      setError('Error fetching scoring system');
    }
  };

  const handleToggle = async () => {
    const newSystem = system === 'Stableford' ? 'StrokePlay' : 'Stableford';
    try {
      const response = await axios.put('http://localhost:3000/api/scoring_system', { system: newSystem }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setSystem(response.data.system);
    } catch (err) {
      setError('Error updating scoring system');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Scoring System</h2>
      <p className="text-magnolia-cream font-lato mb-4">Current System: {system}</p>
      <button
        onClick={handleToggle}
        className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream"
      >
        Toggle to {system === 'Stableford' ? 'StrokePlay' : 'Stableford'}
      </button>
      {error && <p className="text-azalea-pink mt-4 font-lato">{error}</p>}
    </div>
  );
}