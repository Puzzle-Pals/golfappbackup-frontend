import { useState, useEffect } from 'react';
import axios from 'axios';
import { mockNews } from '../utils/mockData';

export default function Home() {
  const [news, setNews] = useState([]);
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>BP Golf App</h1>
      <h2>Latest News</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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