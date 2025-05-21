import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '../components/NavBar';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/admin/dashboard');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - BP Golf League</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
        <NavBar />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)'
        }}>
          <div style={{
            backgroundColor: '#F5E8C7',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '100%',
            maxWidth: '400px'
          }}>
            <h2 style={{ 
              color: '#3C2F2F', 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Admin Login
            </h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  color: '#3C2F2F',
                  marginBottom: '0.5rem'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #3C2F2F'
                  }}
                  required
                />
              </div>
              {error && (
                <div style={{
                  color: '#C71585',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#3C2F2F',
                  color: '#F5E8C7',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}