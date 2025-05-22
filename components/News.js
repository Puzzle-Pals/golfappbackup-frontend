import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState(null);
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data);
      } catch (err) {
        setError('Error loading news, please try again');
      }
    }
    fetchNews();
  }, []);

  const handleSubmitNews = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, details }),
      });
      if (!res.ok) throw new Error('Failed to submit news');
      const newNews = await res.json();
      setNews([...news, newNews]);
      setDate(null);
      setDetails('');
      setError(null);
    } catch (err) {
      setError('Error submitting news, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>News</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmitNews}>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          placeholderText="Select Date"
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