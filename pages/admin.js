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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const { token } = await response.json();
      localStorage.setItem('adminToken', token);
      router.push('/admin/dashboard');

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
        <div style={styles.loginContainer}>
          <div style={styles.loginBox}>
            <h2 style={styles.loginTitle}>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              {error && <div style={styles.error}>{error}</div>}
              <button
                type="submit"
                disabled={loading}
                style={loading ? styles.buttonDisabled : styles.button}
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

const styles = {
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 80px)'
  },
  loginBox: {
    backgroundColor: '#F5E8C7',
    padding: '2rem',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '400px'
  },
  loginTitle: {
    color: '#3C2F2F',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    color: '#3C2F2F',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.25rem',
    border: '1px solid #3C2F2F'
  },
  error: {
    color: '#C71585',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3C2F2F',
    color: '#F5E8C7',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer'
  },
  buttonDisabled: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3C2F2F',
    color: '#F5E8C7',
    border: 'none',
    borderRadius: '0.25rem',
    opacity: 0.7
  }
};