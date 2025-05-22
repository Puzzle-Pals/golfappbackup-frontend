import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { mockEvents } from '../utils/mockData';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axios.get('https://bp-golf-app-backend.vercel.app/api/events', {
          timeout: 5000,
          retry: 3,
          retryDelay: 2000,
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Fetch events error:', err.message);
        setError('Unable to load events, showing sample data');
        setEvents(mockEvents);
      }
    }
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bp-golf-app-backend.vercel.app/api/events', {
        name,
        date,
        course: 'Lake of the Sandhills Golf Course',
        details,
      });
      setEvents([...events, res.data]);
      setName('');
      setDate(null);
      setDetails('');
      setError(null);
    } catch (err) {
      console.error('Add event error:', err.message);
      setError('Error adding event, please try again');
    }
  };

  return (
    <div className="admin-tab">
      <h2>Events</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          placeholderText="Select Date"
          required
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Event Details"
        />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name} - {new Date(event.date).toLocaleDateString()} - {event.course}
            {event.details && <p>{event.details}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}