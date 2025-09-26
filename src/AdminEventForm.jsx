import React, { useState } from 'react';

const initialState = {
  title: '',
  description: '',
  date: '',
  time: '',
  end_time: '',
  location: '',
  address: '',
  type: 'festival',
  highlights: '',
  featured: false,
  status: 'upcoming',
  image_url: '',
};

const AdminEventForm = ({ adminCreds }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, image_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${backendUrl}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...adminCreds })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create event');
      setSuccess('Event created successfully!');
      setForm(initialState);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 text-green-700">Add New Event</h2>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="festival">Festival</option>
            <option value="workshop">Workshop</option>
            <option value="competition">Competition</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold">Time</label>
          <input name="time" value={form.time} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold">End Time</label>
          <input name="end_time" value={form.end_time} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block font-semibold">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block font-semibold">Highlights (comma separated)</label>
          <input name="highlights" value={form.highlights} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          <label className="font-semibold">Featured</label>
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Image</label>
          <input type="file" accept="image/*" onChange={handleImage} className="w-full" />
        </div>
      </div>
      <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-red-700 transition-all duration-300" disabled={loading}>
        {loading ? 'Adding...' : 'Add Event'}
      </button>
    </form>
  );
};

export default AdminEventForm;
