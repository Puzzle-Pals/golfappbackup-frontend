import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AddWeek() {
  const [players, setPlayers] = useState([]);
  const [weekNumber, setWeekNumber] = useState(1);
  const [results, setResults] = useState({
    winners: { player1: '', player2: '', score: '' },
    secondPlace: { player1: '', player2: '', score: '' },
    highestScore: { player1: '', player2: '', score: '' },
    deucePot: { player: '' },
    closestToPin: { player: '' },
  });
  const [payouts, setPayouts] = useState({
    total: '',
    winners: { player1: '', player2: '' },
    secondPlace: { player1: '', player2: '' },
    deucePot: { player1: '', player2: '' },
    closestToPin: { player: '' },
    highestScore: { player: '' },
  });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/players`);
        if (!res.ok) throw new Error('Failed to fetch players');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        setError('Failed to fetch players');
      }
    };
    const fetchWeekNumber = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results`);
        if (!res.ok) throw new Error('Failed to fetch results');
        const data = await res.json();
        setWeekNumber(data.length > 0 ? Math.max(...data.map(r => r.week)) + 1 : 1);
      } catch (err) {
        setError('Failed to fetch week number');
      }
    };
    fetchPlayers();
    fetchWeekNumber();
  }, []);

  const handleResultChange = (category, field, value) => {
    setResults((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handlePayoutChange = (category, field, value) => {
    setPayouts((prev) => ({
      ...prev,
      [category]: field ? { ...prev[category], [field]: value } : value,
    }));
  };

  const calculatePayouts = () => {
    const total = parseFloat(payouts.total) || 0;
    return {
      winners: (total * 0.3).toFixed(2),
      secondPlace: (total * 0.2).toFixed(2),
      deucePot: (total * 0.2).toFixed(2),
      closestToPin: (total * 0.2).toFixed(2),
      highestScore: (total * 0.1).toFixed(2),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultPayload = {
        week: weekNumber,
        winners: results.winners,
        secondPlace: results.secondPlace,
        highestScore: results.highestScore,
        deucePot: results.deucePot,
        closestToPin: results.closestToPin,
      };
      const payoutPayload = {
        week: weekNumber,
        total: parseFloat(payouts.total) || 0,
        winners: { players: [payouts.winners.player1, payouts.winners.player2], amount: calculatePayouts().winners },
        secondPlace: { players: [payouts.secondPlace.player1, payouts.secondPlace.player2], amount: calculatePayouts().secondPlace },
        deucePot: { players: [payouts.deucePot.player1, payouts.deucePot.player2], amount: calculatePayouts().deucePot },
        closestToPin: { players: [payouts.closestToPin.player], amount: calculatePayouts().closestToPin },
        highestScore: { players: [payouts.highestScore.player], amount: calculatePayouts().highestScore },
      };

      const resultRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultPayload),
      });
      if (!resultRes.ok) throw new Error('Failed to save results');

      const payoutRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prize_payouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payoutPayload),
      });
      if (!payoutRes.ok) throw new Error('Failed to save payouts');

      router.push('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  const calculatedPayouts = calculatePayouts();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', padding: '2rem' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', marginBottom: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
        </div>
      </nav>
      <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#F5E8C7', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#3C2F2F', marginBottom: '1.5rem' }}>Add Week {weekNumber}</h1>
        {error && <p style={{ color: '#C71585', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F', marginBottom: '1rem' }}>Weekly Results</h2>
            {['winners', 'secondPlace', 'highestScore'].map((category) => (
              <div key={category} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#3C2F2F', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {category === 'winners' ? 'Winners' : category === 'secondPlace' ? '2nd Place' : 'Highest Score'}
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select
                    value={results[category].player1}
                    onChange={(e) => handleResultChange(category, 'player1', e.target.value)}
                    style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                    required
                  >
                    <option value="">Select Player 1</option>
                    {players.map((player) => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                  <select
                    value={results[category].player2}
                    onChange={(e) => handleResultChange(category, 'player2', e.target.value)}
                    style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                    required
                  >
                    <option value="">Select Player 2</option>
                    {players.map((player) => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={results[category].score}
                    onChange={(e) => handleResultChange(category, 'score', e.target.value)}
                    placeholder="Team Score"
                    style={{ width: '100px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                    required
                  />
                </div>
              </div>
            ))}
            {['deucePot', 'closestToPin'].map((category) => (
              <div key={category} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#3C2F2F', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {category === 'deucePot' ? 'Deuce Pot' : 'Closest to Pin'}
                </label>
                <select
                  value={results[category].player}
                  onChange={(e) => handleResultChange(category, 'player', e.target.value)}
                  style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                  required
                >
                  <option value="">Select Player</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F', marginBottom: '1rem' }}>Prize Payouts</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#3C2F2F', fontWeight: '600', marginBottom: '0.5rem' }}>Total Prize Pool ($)</label>
              <input
                type="number"
                value={payouts.total}
                onChange={(e) => handlePayoutChange('total', null, e.target.value)}
                style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                required
              />
            </div>
            {[
              { key: 'winners', label: 'Winners (30%)', percentage: calculatedPayouts.winners },
              { key: 'secondPlace', label: '2nd Place (20%)', percentage: calculatedPayouts.secondPlace },
              { key: 'deucePot', label: 'Deuce Pot (20%)', percentage: calculatedPayouts.deucePot },
              { key: 'highestScore', label: 'Highest Score (10%)', percentage: calculatedPayouts.highestScore },
              { key: 'closestToPin', label: 'Closest to Pin (20%)', percentage: calculatedPayouts.closestToPin },
            ].map((category) => (
              <div key={category.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#3C2F2F', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {category.label}: ${category.percentage}
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <select
                    value={payouts[category.key].player1 || payouts[category.key].player}
                    onChange={(e) => handlePayoutChange(category.key, category.key === 'closestToPin' || category.key === 'highestScore' ? 'player' : 'player1', e.target.value)}
                    style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                    required
                  >
                    <option value="">Select Player {category.key === 'closestToPin' || category.key === 'highestScore' ? '' : '1'}</option>
                    {players.map((player) => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                  {(category.key !== 'closestToPin' && category.key !== 'highestScore') && (
                    <select
                      value={payouts[category.key].player2}
                      onChange={(e) => handlePayoutChange(category.key, 'player2', e.target.value)}
                      style={{ width: '200px', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem' }}
                      required
                    >
                      <option value="">Select Player 2</option>
                      {players.map((player) => (
                        <option key={player.id} value={player.id}>{player.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
            onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
          >
            Save Week
          </button>
        </form>
      </div>
    </div>
  );
}