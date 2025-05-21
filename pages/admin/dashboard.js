import Head from 'next/head';
import NavBar from '../../components/NavBar';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin Dashboard - BP Golf League</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
        <NavBar />
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '2rem',
          backgroundColor: '#F5E8C7',
          borderRadius: '0.5rem'
        }}>
          <h2 style={{ 
            color: '#3C2F2F', 
            marginBottom: '1.5rem',
            fontSize: '1.5rem'
          }}>
            Admin Dashboard
          </h2>
          {/* Admin content */}
        </main>
      </div>
    </>
  );
}