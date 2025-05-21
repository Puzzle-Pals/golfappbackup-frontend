import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [course, setCourse] = useState('Lake of the Sandhills Golf Course');
  const [details, setDetails] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/events');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const eventData = {
      date: date.toISOString().split('T')[0],
      time,
      course,
      details,
    };
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/admin/events/${editingId}`, eventData);
        setSuccess('Event updated');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3000/api/admin/events', eventData);
        setSuccess('Event added');
      }
      setDate(new Date());
      setTime('');
      setCourse('Lake of the Sandhills Golf Course');
      setDetails('');
      fetchEvents();
    } catch (err) {
      setError('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setDate(new Date(event.date));
    setTime(event.time);
    setCourse(event.course);
    setDetails(event.details || '');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:3000/api/admin/events/${id}`);
        setSuccess('Event deleted');
        fetchEvents();
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="yyyy-MM-dd"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <textarea
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update Event' : 'Add Event'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Course</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.course}</td>
              <td>{event.details || '-'}</td>
              <td>
                <button onClick={() => handleEdit(event)}>Edit</button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventManagement;