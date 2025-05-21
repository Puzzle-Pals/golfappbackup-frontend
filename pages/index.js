import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold' }}>BP Golf League</h1>
          <div className="nav-links">
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Weekly Results
            </Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Player Stats
            </Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#C71585'} onMouseOut={(e) => e.target.style.color = '#F5E8C7'}>
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', color: '#F5E8C7', fontWeight: 'bold', marginBottom: '1rem' }}>Welcome to BP Golf League</h2>
        <p style={{ color: '#F5E8C7', fontSize: '1.125rem', marginBottom: '2rem' }}>Track your scores, stats, and standings in our men's golf league!</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link href="/weekly-results" style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', transition: 'background-color 0.2s, color 0.2s' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }} onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}>
            View Results
          </Link>
          <Link href="/leaderboard" style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none', transition: 'background-color 0.2s, color 0.2s' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }} onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}>
            Check Leaderboard
          </Link>
        </div>
      </main>
    </div>
  );
}