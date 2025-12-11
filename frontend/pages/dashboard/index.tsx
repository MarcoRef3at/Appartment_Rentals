import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function DashboardHome() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-medium text-gray-500 uppercase">Active Bookings</h3>
           <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-medium text-gray-500 uppercase">Properties</h3>
           <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-medium text-gray-500 uppercase">Revenue (Mo)</h3>
           <p className="text-3xl font-bold text-green-600 mt-2">$4,250</p>
        </div>
      </div>

    </DashboardLayout>
  );
}
