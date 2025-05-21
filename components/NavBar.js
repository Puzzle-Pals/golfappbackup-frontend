// components/NavBar.js
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav style={{ 
      backgroundColor: '#3C2F2F', 
      padding: '1rem', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Left-aligned home link */}
        <Link href="/" style={{ 
          color: '#F5E8C7', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          textDecoration: 'none'
        }}>
          BP Men's League
        </Link>

        {/* Right-aligned navigation links */}
        <div style={{ display: 'flex', gap: '3rem' }}>
          <Link href="/weekly-results" style={{ 
            color: '#F5E8C7', 
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}>
            Weekly Results
          </Link>
          <Link href="/player-stats" style={{ 
            color: '#F5E8C7', 
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}>
            Player Stats
          </Link>
          <Link href="/leaderboard" style={{ 
            color: '#F5E8C7', 
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}>
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
}