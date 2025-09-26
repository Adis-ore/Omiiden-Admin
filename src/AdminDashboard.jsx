
import React, { useState } from 'react';
import AdminEventForm from './AdminEventForm';
import AdminGalleryForm from './AdminGalleryForm';
import AdminEventList from './AdminEventList';
import AdminGalleryList from './AdminGalleryList';

const AdminDashboard = ({ adminCreds, onLogout }) => {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 rounded-l-lg font-semibold ${activeTab === 'events' ? 'bg-green-600 text-white' : 'bg-white text-green-700 border'}`}
            onClick={() => setActiveTab('events')}
          >
            Add Event
          </button>
          <button
            className={`px-6 py-2 rounded-r-lg font-semibold ${activeTab === 'gallery' ? 'bg-red-600 text-white' : 'bg-white text-red-700 border'}`}
            onClick={() => setActiveTab('gallery')}
          >
            Add Gallery Item
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === 'events' ? (
            <>
              <AdminEventForm adminCreds={adminCreds} />
              <AdminEventList adminCreds={adminCreds} />
            </>
          ) : (
            <>
              <AdminGalleryForm adminCreds={adminCreds} />
              <AdminGalleryList adminCreds={adminCreds} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
