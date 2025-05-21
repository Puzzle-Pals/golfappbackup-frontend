import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScoringSystemToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/scoring_system');
      setIsEnabled(response.data.is_enabled);
    } catch (err) {
      setError('Failed to fetch scoring system status');
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleToggle = async () => {
    setError('');
    setSuccess('');
    try {
      await axios.put('http://localhost:3000/api/admin/scoring_system', { is_enabled: !isEnabled });
      setIsEnabled(!isEnabled);
      setSuccess('Scoring system updated');
    } catch (err) {
      setError('Failed to update scoring system');
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={handleToggle}
        />
        Enable Scoring System (3 for Win, 2 for 2nd, 1 for Highest Score)
      </label>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default ScoringSystemToggle;