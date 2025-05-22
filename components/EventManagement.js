import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError('Error loading events, please try again');
      }
    }
    fetchEvents();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          date,
          course: 'Lake of the Sandhills Golf Course',
          details,
        }),
      });
      if (!res.ok) throw new Error('Failed to add event');
      const newEvent = await res.json();
      setEvents([...events, newEvent]);
      setName('');
      setDate(null);
      setDetails('');
      setError(null);
    } catch (err) {
      setError('Error adding event, please try again');
    }
  };

  return (
    <div>
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