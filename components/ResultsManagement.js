import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [weekNumber, setWeekNumber] = useState('');
  const [winner1Name, setWinner1Name] = useState('');
  const [winner2Name, setWinner2Name] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await api.get('/results');
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch results');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = { weekNumber: parseInt(weekNumber), winner1Name, winner2Name };
      if (editId) {
        await api.put(`/results/${editId}`, data);
        setSuccess('Result updated');
        setEditId(null);
      } else {
        await api.post('/results', data);
        setSuccess('Result added');
      }
      setWeekNumber('');
      setWinner1Name('');
      setWinner2Name('');
      fetchResults();
    } catch (err) {
      setError('Failed to save result');
    }
  };

  const handleEdit = (result) => {
    setEditId(result._id);
    setWeekNumber(result.weekNumber.toString());
    setWinner1Name(result.winner1Name);
    setWinner2Name(result.winner2Name);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/results/${id}`);
      setSuccess('Result deleted');
      fetchResults();
    } catch (err) {
      setError('Failed to delete result');
    }
  };

  return (
    <div className="results-management">
      <h2 className="text-2xl font-bold text-sunflower-yellow mb-6 font-cinzel">Manage Results</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="number"
          value={weekNumber}
          onChange={(e) => setWeekNumber(e.target.value)}
          placeholder="Week Number"
          className="mb-4 p-3 bg-emerald-green text-sunflower-yellow border-2 border-amethyst-purple rounded-lg w-full font-lato"
          required
        />
        <input
          type="text"
          value={winner1Name}
          onChange={(e) => setWinner1Name(e.target.value)}
          placeholder="Winner 1 Name"
          className="mb-4 p-3 bg-emerald-green text-sunflower-yellow border-2 border-amethyst-purple rounded-lg w-full font-lato"
          required
        />
        <input
          type="text"
          value={winner2Name}
          onChange={(e) => setWinner2Name(e.target.value)}
          placeholder="Winner 2 Name"
          className="mb-4 p-3 bg-emerald-green text-sunflower-yellow border-2 border-amethyst-purple rounded-lg w-full font-lato"
        />
        <button type="submit" className="bg-crimson text-sapphire-blue px-6 py-3 rounded-lg font-lato font-bold hover:bg-amethyst-purple hover:text-sunflower-yellow">
          {editId ? 'Update' : 'Add'} Result
        </button>
        {error && <p className="text-crimson mt-4 font-lato">{error}</p>}
        {success && <p className="text-emerald-green mt-4 font-lato">{success}</p>}
      </form>
      <div className="results-list">
        {results.map((result) => (
          <div key={result._id} className="mb-6 p-6 bg-sapphire-blue border-2 border-amethyst-purple rounded-lg">
            <p className="text-sunflower-yellow font-lato">Week {result.weekNumber}: {result.winner1Name} {result.winner2Name ? `& ${result.winner2Name}` : ''}</p>
            <div className="mt-4 flex space-x-4">
              <button onClick={() => handleEdit(result)} className="bg-crimson text-sapphire-blue px-4 py-2 rounded-lg font-lato hover:bg-amethyst-purple hover:text-sunflower-yellow">
                Edit
              </button>
              <button onClick={() => handleDelete(result._id)} className="bg-crimson text-sapphire-blue px-4 py-2 rounded-lg font-lato hover:bg-amethyst-purple hover:text-sunflower-yellow">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}