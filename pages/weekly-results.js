import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';

export default function WeeklyResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/weekly_results');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResults(); }, []);

  return (
    <>
      <Head>
        <title>Weekly Results - BP Golf League</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
        <NavBar />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 0' }}>
          <h2 style={{ 
            color: '#F5E8C7', 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontSize: '1.875rem'
          }}>
            Weekly Results
          </h2>
          {/* Results table remains the same */}
        </main>
      </div>
    </>
  );
}