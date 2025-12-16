import React, { useState } from 'react';
import { useRouter } from 'next/router';
import GuestLayout from '../../../components/layout/GuestLayout';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Wifi, Copy, MapPin, Phone, MessageCircle, Lock, Unlock, Thermometer, Moon, Sun, ChevronRight, LogOut } from 'lucide-react';

// Mock Data
const bookingData = {
  id: 'b123',
  guestName: 'Alex',
  property: {
    title: 'Sunset Villa',
    address: '123 Ocean Dr, Miami, FL',
    wifi: { ssid: 'SunsetVilla_Guest', pass: 'beachvibes2024' },
    doorCode: '4829',
    hostPhone: '+1 555 123 4567',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
  },
  checkIn: { date: 'Oct 24', time: '3:00 PM' },
  checkOut: { date: 'Oct 28', time: '11:00 AM' }
};

export default function GuestPortal() {
  const router = useRouter();
  const { id } = router.query;
  const booking = bookingData; // In real app, fetch by ID

  const [doorStatus, setDoorStatus] = useState<'locked' | 'unlocked'>('locked');
  const [lightsOn, setLightsOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyWifi = () => {
    navigator.clipboard.writeText(booking.property.wifi.pass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDoor = () => {
      // Simulate API call
      setDoorStatus(prev => prev === 'locked' ? 'unlocked' : 'locked');
  };

  return (
    <GuestLayout title={`Welcome to ${booking.property.title}`}>
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <img
            src={booking.property.images[0]}
            alt={booking.property.title}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none w-fit mb-2 backdrop-blur-sm">
                Confirmed • {booking.checkIn.date} - {booking.checkOut.date}
            </Badge>
            <h1 className="text-3xl font-bold">{booking.property.title}</h1>
            <p className="flex items-center gap-1 text-gray-200 text-sm mt-1">
                <MapPin className="h-4 w-4" /> {booking.property.address}
            </p>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-20">

        {/* Welcome & Host */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Hi, {booking.guestName}! 👋</h2>
                <p className="text-gray-500">Enjoy your stay.</p>
            </div>
            <a href={`https://wa.me/${booking.property.hostPhone.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                </Button>
            </a>
        </div>

        {/* Essential Info Cards */}
        <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary-50 border-primary-100">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                    <span className="text-xs text-primary-600 font-bold uppercase tracking-wide">Check-in</span>
                    <span className="text-2xl font-bold text-gray-900">{booking.checkIn.time}</span>
                    <span className="text-xs text-gray-500">{booking.checkIn.date}</span>
                </CardContent>
            </Card>
            <Card className="bg-gray-50 border-gray-100">
                 <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Check-out</span>
                    <span className="text-2xl font-bold text-gray-900">{booking.checkOut.time}</span>
                    <span className="text-xs text-gray-500">{booking.checkOut.date}</span>
                </CardContent>
            </Card>
        </div>

        {/* Access & Wifi */}
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Access & WiFi</h3>

            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <Wifi className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{booking.property.wifi.ssid}</p>
                            <p className="text-xs text-gray-500">Pass: {booking.property.wifi.pass}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={copyWifi}>
                        {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                    </Button>
                </CardContent>
            </Card>

             <Card>
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                            <Lock className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Door Code</p>
                            <p className="text-xs text-gray-500">
                                {showCode ? booking.property.doorCode : '••••'}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowCode(!showCode)}>
                         {showCode ? 'Hide' : 'Reveal'}
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Smart Controls */}
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Smart Controls</h3>
            <div className="grid grid-cols-2 gap-4">
                <Button
                    className={`h-auto py-6 flex flex-col gap-2 ${doorStatus === 'unlocked' ? 'bg-green-600 hover:bg-green-700 ring-2 ring-green-600 ring-offset-2' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'}`}
                    onClick={toggleDoor}
                >
                    {doorStatus === 'unlocked' ? <Unlock className="h-8 w-8" /> : <Lock className="h-8 w-8 text-gray-400" />}
                    <span className="font-medium">{doorStatus === 'unlocked' ? 'Door Unlocked' : 'Unlock Door'}</span>
                </Button>

                <Button
                    className={`h-auto py-6 flex flex-col gap-2 ${!lightsOn ? 'bg-gray-800 text-white hover:bg-gray-900' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'}`}
                    onClick={() => setLightsOn(!lightsOn)}
                >
                    {lightsOn ? <Sun className="h-8 w-8 text-yellow-500" /> : <Moon className="h-8 w-8" />}
                    <span className="font-medium">{lightsOn ? 'Lights On' : 'Night Mode'}</span>
                </Button>
            </div>

            <Card>
                <CardContent className="p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                            <Thermometer className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900">AC Temperature</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">-</Button>
                        <span className="font-bold text-lg">22°C</span>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">+</Button>
                     </div>
                </CardContent>
            </Card>
        </div>

        {/* Guide / Upsell */}
        <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-between h-auto py-4">
                <div className="text-left">
                    <p className="font-medium text-gray-900">House Guide</p>
                    <p className="text-xs text-gray-500">How to use appliances & amenities</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="secondary" className="w-full justify-between h-auto py-4">
                 <div className="text-left">
                    <p className="font-medium text-gray-900">Order Breakfast</p>
                    <p className="text-xs text-gray-500">Delivered to your door • From $15</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
        </div>

        <div className="pt-8 text-center">
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Check Out Early
            </Button>
        </div>

      </div>
    </GuestLayout>
  );
}
