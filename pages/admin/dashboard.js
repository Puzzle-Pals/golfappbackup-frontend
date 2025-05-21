import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from '../../components/NavBar';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard - BP Golf League</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
        <NavBar />
        <main style={styles.dashboard}>
          <h2 style={styles.title}>Admin Dashboard</h2>
          {/* Admin components go here */}
        </main>
      </div>
    </>
  );
}

const styles = {
  dashboard: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#F5E8C7',
    borderRadius: '0.5rem',
    minHeight: 'calc(100vh - 80px)'
  },
  title: {
    color: '#3C2F2F',
    marginBottom: '1.5rem',
    fontSize: '1.5rem'
  }
};