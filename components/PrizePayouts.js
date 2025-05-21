import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PrizePayouts() {
  const [payouts, setPayouts] = useState([]);
  const [newPayout, setNewPayout] = useState({ place: '', percentage: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/prize_payouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setPayouts(response.data);
    } catch (err) {
      setError('Error fetching payouts');
    }
  };

  const handleAddPayout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/prize_payouts', newPayout, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setPayouts([...payouts, response.data]);
      setNewPayout({ place: '', percentage: '' });
    } catch (err) {
      setError('Error adding payout');
    }
  };

  const handleDeletePayout = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/prize_payouts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setPayouts(payouts.filter(payout => payout._id !== id));
    } catch (err) {
      setError('Error deleting payout');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Prize Payouts</h2>
      <form onSubmit={handleAddPayout} className="mb-6">
        <input
          type="number"
          placeholder="Place"
          value={newPayout.place}
          onChange={(e) => setNewPayout({ ...newPayout, place: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <input
          type="number"
          placeholder="Percentage"
          value={newPayout.percentage}
          onChange={(e) => setNewPayout({ ...newPayout, percentage: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          Add Payout
        </button>
      </form>
      {error && <p className="text-azalea-pink mb-4 font-lato">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map(payout => (
            <tr key={payout._id}>
              <td>{payout.place}</td>
              <td>{payout.percentage}%</td>
              <td>
                <button
                  onClick={() => handleDeletePayout(payout._id)}
                  className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}