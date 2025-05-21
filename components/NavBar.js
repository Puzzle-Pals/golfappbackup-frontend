// components/NavBar.js
import Link from 'next/link';
export default function NavBar() {
  return (
    <nav className="nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-golf-banner">
      <Link href="/" className="brand">BP Men’s League</Link>
      <div className="flex space-x-20">
        <Link href="/weekly-results">Weekly Results</Link>
        <Link href="/player-stats">Player Stats</Link>
        <Link href="/leaderboard">Leaderboard</Link>
      </div>
    </nav>
  );
}