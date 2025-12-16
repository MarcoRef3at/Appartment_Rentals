import React from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
import { Lock, Unlock, Thermometer, Lightbulb, Power, ArrowLeft, Save } from 'lucide-react';

// Mock Data for a single property
const propertyData = {
  id: '1',
  title: 'Sunset Villa',
  address: '123 Ocean Dr, Miami, FL',
  image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  description: 'A beautiful villa overlooking the ocean with smart amenities.',
  wifi: { ssid: 'SunsetVilla_Guest', pass: 'beachvibes2024' },
  devices: [
    { id: 'd1', name: 'Front Door', type: 'lock', status: 'locked', battery: '85%' },
    { id: 'd2', name: 'Living Room AC', type: 'ac', status: 'on', temp: '22°C' },
    { id: 'd3', name: 'Master Lights', type: 'light', status: 'off' },
  ]
};

export default function PropertyDetail() {
  const router = useRouter();
  const { id } = router.query;

  // In a real app, fetch data based on ID
  const property = propertyData;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{property.title}</h1>
            <Badge variant="success" className="text-sm">Active</Badge>
            <div className="ml-auto flex gap-2">
                <Button variant="outline">Sync Calendar</Button>
                <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
                <div className="aspect-video w-full bg-gray-200 relative">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-t-lg" />
                </div>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Property Title</label>
                            <Input defaultValue={property.title} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Address</label>
                            <Input defaultValue={property.address} />
                        </div>
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-700">Description</label>
                         <textarea className="w-full min-h-[100px] rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" defaultValue={property.description} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>Manage smart home devices for this unit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {property.devices.map(device => (
                            <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-full border border-gray-200">
                                        {device.type === 'lock' && <Lock className="h-5 w-5 text-gray-700" />}
                                        {device.type === 'ac' && <Thermometer className="h-5 w-5 text-blue-600" />}
                                        {device.type === 'light' && <Lightbulb className="h-5 w-5 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{device.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{device.status} {device.temp && `• ${device.temp}`}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     {device.type === 'lock' && (
                                        <Button size="sm" variant={device.status === 'locked' ? 'primary' : 'outline'}>
                                            {device.status === 'locked' ? 'Unlock' : 'Lock'}
                                        </Button>
                                     )}
                                      {device.type !== 'lock' && (
                                        <Button size="sm" variant="outline">
                                            <Power className="h-4 w-4" />
                                        </Button>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Access & Wifi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">WiFi SSID</label>
                        <div className="font-mono bg-gray-100 p-2 rounded text-sm">{property.wifi.ssid}</div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">WiFi Password</label>
                        <div className="font-mono bg-gray-100 p-2 rounded text-sm flex justify-between items-center">
                            {property.wifi.pass}
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Save className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-sm">
                            <p className="font-medium">Oct 24 - Oct 28</p>
                            <p className="text-gray-500">Alice Johnson</p>
                        </div>
                        <div className="text-sm pt-4 border-t">
                            <p className="font-medium">Nov 01 - Nov 05</p>
                            <p className="text-gray-500">Charlie Brown</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-primary-600">View All Bookings</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
