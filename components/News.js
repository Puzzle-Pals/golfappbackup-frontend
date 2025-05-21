import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [newNews, setNewNews] = useState({ date: null, details: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setError('Failed to fetch news');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = newNews.date ? newNews.date.toISOString().split('T')[0] : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, details: newNews.details }),
      });
      if (!res.ok) throw new Error('Failed to add news');
      setNewNews({ date: null, details: '' });
      fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete news');
      fetchNews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Manage News</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Date</label>
          <DatePicker
            selected={newNews.date}
            onChange={(date) => setNewNews({ ...newNews, date })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Details</label>
          <textarea
            value={newNews.details}
            onChange={(e) => setNewNews({ ...newNews, details: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem', minHeight: '100px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
        >
          Submit News
        </button>
      </form>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>Existing News</h3>
        {news.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F5E8C7', padding: '1rem', borderRadius: '0.25rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#3C2F2F' }}>
              {item.date}: {item.details}
            </span>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}