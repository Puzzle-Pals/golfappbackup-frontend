import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', course: '' });

  const fetchEvents = () => {
    axios.get('/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Fetch error:', err));
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/events', newEvent)
      .then(() => {
        fetchEvents();
        setNewEvent({ name: '', date: '', course: '' });
      })
      .catch(err => console.error('Create error:', err));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Event Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newEvent.name}
          onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
          placeholder="Event name"
          required
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          required
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          value={newEvent.course}
          onChange={(e) => setNewEvent({...newEvent, course: e.target.value})}
          placeholder="Course"
          required
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Add Event
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        {events.map(event => (
          <div key={event.id} style={{ marginBottom: '0.5rem' }}>
            {event.name} - {event.date} - {event.course}
          </div>
        ))}
      </div>
    </div>
  );
}