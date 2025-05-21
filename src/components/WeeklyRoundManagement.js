import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function WeeklyRoundManagement() {
  const [rounds, setRounds] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [weekNumber, setWeekNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchData = async () => {
    try {
      const [roundsRes, eventsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/admin/weekly_rounds'),
        axios.get('http://localhost:3000/api/admin/events'),
      ]);
      setRounds(roundsRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:3000/api/admin/weekly_rounds', {
        event_id: parseInt(eventId),
        week_number: parseInt(weekNumber),
      });
      setSuccess('Weekly round added');
      setEventId('');
      setWeekNumber('');
      fetchData();
    } catch (err) {
      setError('Failed to add weekly round');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this weekly round?')) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/weekly_rounds/${id}`);
        setSuccess('Weekly round deleted');
        fetchData();
      } catch (err) {
        setError('Failed to delete weekly round');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        >
          <option value="">Select Event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.date} {event.time} - {event.course}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Week Number"
          value={weekNumber}
          onChange={(e) => setWeekNumber(e.target.value)}
          required
        />
        <button type="submit">Add Weekly Round</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Date</th>
            <th>Time</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rounds.map(round => (
            <tr key={round.id}>
              <td>{round.week_number}</td>
              <td>{round.date}</td>
              <td>{round.time}</td>
              <td>{round.course}</td>
              <td>
                <button onClick={() => handleDelete(round.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyRoundManagement;