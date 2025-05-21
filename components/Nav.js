import Link from 'next/link';

export function Nav() {
  return (
    <nav className="bg-emerald-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">BP Golf League</Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/weekly-results" className="hover:underline">Weekly Results</Link>
          <Link href="/player-stats" className="hover:underline">Player Stats</Link>
          <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
        </div>
      </div>
    </nav>
  );
}