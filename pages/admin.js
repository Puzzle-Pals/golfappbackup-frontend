import Link from 'next/link';
import PlayerManagement from '../components/PlayerManagement';
import EventManagement from '../components/EventManagement';
import WeeklyResultsManagement from '../components/WeeklyResultsManagement';
import News from '../components/News';
import Messaging from '../components/Messaging';

export default function Admin() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Portal</h1>
      <nav>
        <Link href="/"><a>BP Men's League</a></Link> | 
        <Link href="/leaderboard"><a>Leaderboard</a></Link> | 
        <Link href="/player-stats"><a>Player Stats</a></Link> | 
        <Link href="/weekly-results"><a>Weekly Results</a></Link>
      </nav>
      <div className="admin-tab">
        <h2>Players</h2>
        <PlayerManagement />
      </div>
      <div className="admin-tab">
        <h2>Events</h2>
        <EventManagement />
      </div>
      <div className="admin-tab">
        <h2>Weekly Results</h2>
        <WeeklyResultsManagement />
      </div>
      <div className="admin-tab">
        <h2>News</h2>
        <News />
      </div>
      <div className="admin-tab">
        <h2>Messaging</h2>
        <Messaging />
      </div>
    </div>
  );
}