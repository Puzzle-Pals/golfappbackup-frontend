import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Diagnostic() {
  const [status, setStatus] = useState({});

  const endpoints = [
    '/api/players',
    '/api/events',
    '/api/weekly_results',
    '/api/news',
    '/api/leaderboard',
    '/api/scoring_system',
  ];

  useEffect(() => {
    async function checkEndpoints() {
      const results = {};
      for (const endpoint of endpoints) {
        try {
          const res = await axios.get(`https://bp-golf-app-backend.vercel.app${endpoint}`, { timeout: 5000 });
          results[endpoint] = { status: res.status, message: 'OK' };
        } catch (err) {
          results[endpoint] = { status: err.response?.status || 'N/A', message: err.message };
        }
      }
      setStatus(results);
    }
    checkEndpoints();
  }, []);

  return (
    <div className="admin-tab">
      <h1>Backend Diagnostic</h1>
      <p>Backend URL: https://bp-golf-app-backend.vercel.app</p>
      <h2>Endpoint Status</h2>
      <ul>
        {Object.entries(status).map(([endpoint, { status, message }]) => (
          <li key={endpoint}>
            {endpoint}: Status {status} - {message}
          </li>
        ))}
      </ul>
    </div>
  );
}