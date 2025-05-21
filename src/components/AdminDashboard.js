import React from 'react';
import PlayerManagement from './PlayerManagement';
import EventManagement from './EventManagement';
import WeeklyRoundManagement from './WeeklyRoundManagement';
import WeeklyResultsManagement from './WeeklyResultsManagement';
import ScoringSystemToggle from './ScoringSystemToggle';
import PrizePayouts from './PrizePayouts';
import Messaging from './Messaging';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Portal</h1>
      <div className="container">
        <div className="admin-section">
          <h2>Player Management</h2>
          <PlayerManagement />
        </div>
        <div className="admin-section">
          <h2>Event Management</h2>
          <EventManagement />
        </div>
        <div className="admin-section">
          <h2>Weekly Rounds</h2>
          <WeeklyRoundManagement />
        </div>
        <div className="admin-section">
          <h2>Weekly Results</h2>
          <WeeklyResultsManagement />
        </div>
        <div className="admin-section">
          <h2>Scoring System</h2>
          <ScoringSystemToggle />
        </div>
        <div className="admin-section">
          <h2>Prize Payouts</h2>
          <PrizePayouts />
        </div>
        <div className="admin-section">
          <h2>Messaging</h2>
          <Messaging />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;