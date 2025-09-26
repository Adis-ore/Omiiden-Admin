import React from 'react';
import AdminApp from './AdminApp';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return <AdminApp />;
};

export default App;
