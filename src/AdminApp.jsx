
import React, { useState, useEffect, useCallback } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const STORAGE_KEY = 'omiiden_admin_auth';
const EXPIRY_KEY = 'omiiden_admin_expiry';
const ONE_HOUR = 60 * 60 * 1000;

const AdminApp = () => {
  const [adminCreds, setAdminCreds] = useState(() => {
    const creds = localStorage.getItem(STORAGE_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (creds && expiry && Date.now() < Number(expiry)) {
      return JSON.parse(creds);
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    return null;
  });

  // Set up auto-logout after 1 hour of inactivity
  useEffect(() => {
    if (!adminCreds) return;
    const expiry = localStorage.getItem(EXPIRY_KEY);
    const timeout = expiry ? Number(expiry) - Date.now() : ONE_HOUR;
    if (timeout <= 0) {
      handleLogout();
      return;
    }
    const timer = setTimeout(() => {
      handleLogout();
    }, timeout);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [adminCreds]);

  // Refresh expiry on any activity
  useEffect(() => {
    if (!adminCreds) return;
    const refreshExpiry = () => {
      localStorage.setItem(EXPIRY_KEY, String(Date.now() + ONE_HOUR));
    };
    window.addEventListener('mousemove', refreshExpiry);
    window.addEventListener('keydown', refreshExpiry);
    window.addEventListener('click', refreshExpiry);
    return () => {
      window.removeEventListener('mousemove', refreshExpiry);
      window.removeEventListener('keydown', refreshExpiry);
      window.removeEventListener('click', refreshExpiry);
    };
  }, [adminCreds]);

  const handleLogin = useCallback((creds) => {
    setAdminCreds(creds);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
    localStorage.setItem(EXPIRY_KEY, String(Date.now() + ONE_HOUR));
  }, []);

  const handleLogout = useCallback(() => {
    setAdminCreds(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  }, []);

  if (!adminCreds) {
    return <AdminLogin onLogin={handleLogin} />;
  }
  return <AdminDashboard adminCreds={adminCreds} onLogout={handleLogout} />;
};

export default AdminApp;
