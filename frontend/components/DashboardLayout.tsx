import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import { LayoutDashboard, Home, Calendar, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">Smart Stay</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active={router.pathname === '/dashboard'} />
          <NavItem href="/dashboard/properties" icon={<Home size={20} />} label="Properties" active={router.pathname.startsWith('/dashboard/properties')} />
          <NavItem href="/dashboard/bookings" icon={<Calendar size={20} />} label="Bookings" active={router.pathname.startsWith('/dashboard/bookings')} />
          <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Settings" active={router.pathname.startsWith('/dashboard/settings')} />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 text-gray-600 hover:text-red-600 px-4 py-2 w-full text-left rounded-lg hover:bg-red-50 transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Nav Overlay (simplified) */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between md:hidden">
             <span className="font-bold text-blue-600">Smart Stay</span>
             <button onClick={handleLogout}><LogOut size={20}/></button>
        </header>
        <div className="p-6">
           {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }: any) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(href)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg w-full text-left text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        >
            {icon}
            {label}
        </button>
    )
}
