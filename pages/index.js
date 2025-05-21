import Head from 'next/head';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>BP Golf League</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
        <NavBar />
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '3rem 0', 
          textAlign: 'center' 
        }}>
          <h2 style={{ 
            fontSize: '2.25rem', 
            color: '#F5E8C7', 
            fontWeight: 'bold', 
            marginBottom: '1rem' 
          }}>
            Welcome to BP Golf League
          </h2>
          <div style={{ 
            backgroundColor: '#F5E8C7', 
            borderRadius: '0.5rem', 
            padding: '2rem',
            marginTop: '2rem',
            color: '#3C2F2F'
          }}>
            {/* Admin-managed content */}
          </div>
        </main>
      </div>
    </>
  );
}