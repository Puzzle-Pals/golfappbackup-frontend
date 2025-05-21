import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: new Date(), course: 'Default Course' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setEvents(response.data);
    } catch (err) {
      setError('Error fetching events');
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/events', newEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setEvents([...events, response.data]);
      setNewEvent({ name: '', date: new Date(), course: 'Default Course' });
    } catch (err) {
      setError('Error adding event');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      setError('Error deleting event');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Event Management</h2>
      <form onSubmit={handleAddEvent} className="mb-6">
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <DatePicker
          selected={newEvent.date}
          onChange={(date) => setNewEvent({ ...newEvent, date })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={newEvent.course}
          onChange={(e) => setNewEvent({ ...newEvent, course: e.target.value })}
          className="mb-2 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato"
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          Add Event
        </button>
      </form>
      {error && <p className="text-azalea-pink mb-4 font-lato">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.course}</td>
              <td>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}