import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>BP Golf League</h1>
      <div className="nav-links">
        <Link to="/player-stats">Player Stats</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/weekly-results">Weekly Results</Link>
      </div>
      <p>Welcome to the BP Golf League. Check out player stats, the leaderboard, or weekly results.</p>
    </div>
  );
}

export default Home;