import { useState, useEffect } from 'react';
import axios from 'axios';
import { mockNews } from '../utils/mockData';

export default function News() {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await axios.get('https://bp-golf-app-backend.vercel.app/api/news', {
          timeout: 5000,
          retry: 3,
          retryDelay: 2000,
        });
        setNews(res.data);
      } catch (err) {
        console.error('Fetch news error:', err.message);
        setError('Unable to load news, showing sample data');
        setNews(mockNews);
      }
    }
    fetchNews();
  }, []);

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/news', { date, details });
      setNews([...news, res.data]);
      setDate('');
      setDetails('');
      setError(null);
    } catch (err) {
      console.error('Submit news error:', err.message);
      setError('Error submitting news, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>News</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmitNews}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="News Details"
          required
        />
        <button type="submit">Submit News</button>
      </form>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            {new Date(item.date).toLocaleDateString()} - {item.details}
          </li>
        ))}
      </ul>
    </div>
  );
}