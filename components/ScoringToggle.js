"use client";

import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function ScoringToggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get('/scoring');
        setIsEnabled(response.data.isEnabled || false);
        setSuccess('Scoring status fetched');
      } catch (err) {
        setError('Failed to fetch scoring status');
      }
    };
    fetchStatus();
  }, []);

  const handleToggle = async () => {
    setError('');
    setSuccess('');
    try {
      await api.put('/scoring', { isEnabled: !isEnabled });
      setIsEnabled(!isEnabled);
      setSuccess('Scoring system updated');
    } catch (err) {
      setError('Failed to update scoring system');
    }
  };

  return (
    <div className="scoring-toggle">
      <h2 className="text-xl font-bold text-burnished-gold mb-4 font-cinzel">Scoring System</h2>
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