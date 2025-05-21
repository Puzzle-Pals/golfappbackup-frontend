import React, { useState } from 'react';
import PlayerManagement from './PlayerManagement';
import EventManagement from './EventManagement';
import ScoreManagement from './ScoreManagement';
import NewsManagement from './NewsManagement';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('players');

  const tabs = [
    { id: 'players', label: 'Player Management' },
    { id: 'events', label: 'Event Management' },
    { id: 'scores', label: 'Score Management' },
    { id: 'news', label: 'News Management' },
  ];

  return (
    <div className="container min-h-screen py-8">
      <div className="admin-dashboard">
        <h1 className="text-3xl font-bold text-magnolia-cream mb-6 font-playfair">Admin Dashboard</h1>
        <div className="tabs flex mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab px-4 py-2 text-lg font-semibold font-lato ${activeTab === tab.id ? 'active border-b-4 border-azalea-pink' : 'text-pine-brown'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'players' && <PlayerManagement />}
        {activeTab === 'events' && <EventManagement />}
        {activeTab === 'scores' && <ScoreManagement />}
        {activeTab === 'news' && <NewsManagement />}
      </div>
    </div>
  );
}