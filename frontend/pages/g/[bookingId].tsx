import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import { Wifi, Key, Lock, Sun, Moon, MapPin, MessageCircle } from 'lucide-react';

export default function GuestPortal() {
  const router = useRouter();
  const { bookingId } = router.query;
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) return;

    // Fetch booking details
    // Note: In a real app we would use a secure "portal token" or simplified public endpoint.
    // For MVP we will try to fetch using the booking ID.
    // Since our backend requires Auth for /api/bookings/:id, we need a public endpoint.
    // I will mock the data here for UI development if the API fails,
    // OR I will assume we have a public endpoint mock as per previous server.js (which I removed, oops).
    // Let's bring back a public endpoint in the backend plan or mock it here.
    // For now, I'll mock the data to ensure UI works, then we can wire it up.

    // Simulate API call
    setTimeout(() => {
       setBooking({
         guestName: "Alex",
         propertyTitle: "Oceanview Apartment",
         checkIn: "2023-12-25",
         checkOut: "2023-12-30",
         wifiSSID: "OceanGuest",
         wifiPass: "wave123",
         doorCode: "8821#",
         address: "123 Coastal Hwy, Miami FL"
       });
       setLoading(false);
    }, 500);

  }, [bookingId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold">{booking.propertyTitle}</h1>
        <p className="opacity-90">{booking.checkIn} — {booking.checkOut}</p>
        <div className="mt-4 flex gap-2">
           <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg flex items-center justify-center gap-2 text-sm backdrop-blur-sm">
             <MapPin size={16} /> Directions
           </button>
           <button className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-lg flex items-center justify-center gap-2 text-sm shadow-md">
             <MessageCircle size={16} /> Contact Host
           </button>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
             <Wifi className="text-blue-500 mb-2" size={24} />
             <div className="text-xs text-gray-400 uppercase font-bold">WiFi</div>
             <div className="font-mono font-bold text-lg">{booking.wifiSSID}</div>
             <div className="text-sm text-gray-500">{booking.wifiPass}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
             <Key className="text-orange-500 mb-2" size={24} />
             <div className="text-xs text-gray-400 uppercase font-bold">Door Code</div>
             <div className="font-mono font-bold text-lg tracking-widest">{booking.doorCode}</div>
             <button className="text-xs text-blue-500 mt-1">Tap to reveal</button>
          </div>
        </div>

        {/* Smart Controls */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Smart Controls</h3>
           <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg active:bg-blue-50 active:border-blue-200 border border-transparent transition-colors">
                 <Lock size={24} className="text-gray-600 mb-2" />
                 <span className="text-xs font-medium text-gray-600">Unlock</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg active:bg-blue-50 active:border-blue-200 border border-transparent transition-colors">
                 <Sun size={24} className="text-yellow-500 mb-2" />
                 <span className="text-xs font-medium text-gray-600">Lights On</span>
              </button>
               <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg active:bg-blue-50 active:border-blue-200 border border-transparent transition-colors">
                 <Moon size={24} className="text-indigo-500 mb-2" />
                 <span className="text-xs font-medium text-gray-600">Night Mode</span>
              </button>
           </div>
        </div>

        {/* Guide */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-2">House Guide</h3>
          <ul className="space-y-3">
             <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                Please quiet hours after 10 PM.
             </li>
             <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                No smoking inside the apartment.
             </li>
             <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">3</span>
                Check-out is at 11:00 AM.
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
