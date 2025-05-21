import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#1B4D3E',
      padding: '1rem'
    }}>
      <div style={{ 
        backgroundColor: '#F5E8C7', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)', 
        width: '100%', 
        maxWidth: '28rem' 
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#3C2F2F', 
          marginBottom: '1.5rem', 
          textAlign: 'center' 
        }}>
          Admin Login
        </h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="password" style={{ display: 'block', color: '#3C2F2F', marginBottom: '0.25rem' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #3C2F2F', 
                borderRadius: '0.25rem', 
                color: '#3C2F2F',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          {error && (
            <p style={{ color: '#C71585', fontSize: '0.875rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{ 
              backgroundColor: '#C71585', 
              color: '#F5E8C7', 
              padding: '0.75rem', 
              borderRadius: '0.25rem', 
              border: 'none',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s' 
            }}
            onMouseOver={(e) => { 
              e.target.style.backgroundColor = '#87CEEB'; 
              e.target.style.color = '#3C2F2F'; 
            }}
            onMouseOut={(e) => { 
              e.target.style.backgroundColor = '#C71585'; 
              e.target.style.color = '#F5E8C7'; 
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}