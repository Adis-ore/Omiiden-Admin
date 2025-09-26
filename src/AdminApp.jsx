import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp = () => {
  const [adminCreds, setAdminCreds] = useState(null);

  if (!adminCreds) {
    return <AdminLogin onLogin={setAdminCreds} />;
  }
  return <AdminDashboard adminCreds={adminCreds} />;
};

export default AdminApp;
