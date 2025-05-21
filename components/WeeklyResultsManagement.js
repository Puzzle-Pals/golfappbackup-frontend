import axios from 'axios';
import { useState, useEffect } from 'react';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/api/weekly_results')
      .then(res => setResults(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Weekly Results</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Round ID</th>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Player ID</th>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{result.roundId}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{result.playerId}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}