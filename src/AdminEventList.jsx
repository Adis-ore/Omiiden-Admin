import React, { useEffect, useState } from 'react';
import { backendUrl } from './App';

const AdminEventList = ({ adminCreds }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendUrl}/api/events`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch events');
      setEvents(data.events || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeleting(id);
    setError(null);
    try {
      const res = await fetch(`${backendUrl}/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCreds)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete event');
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4 text-green-700">All Events</h2>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{event.title}</td>
                  <td className="py-2 px-4 border-b">{event.date}</td>
                  <td className="py-2 px-4 border-b">{event.type}</td>
                  <td className="py-2 px-4 border-b">{event.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                      onClick={() => handleDelete(event.id)}
                      disabled={deleting === event.id}
                    >
                      {deleting === event.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEventList;
