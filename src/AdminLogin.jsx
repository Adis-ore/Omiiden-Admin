import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Dummy validation, replace with real API call if needed
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }
    onLogin({ email, password });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-red-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Admin Login</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" className="w-full border rounded-lg px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input type="password" className="w-full border rounded-lg px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-red-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-red-700 transition-all duration-300" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
