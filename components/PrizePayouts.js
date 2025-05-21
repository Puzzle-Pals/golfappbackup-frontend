import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PrizePayouts() {
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    axios.get('/api/prize_payouts')
      .then(res => setPayouts(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Prize Payouts</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Place</th>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map(payout => (
            <tr key={payout.place}>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{payout.place}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{payout.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}