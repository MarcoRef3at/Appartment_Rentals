import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Card, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Calendar as CalendarIcon, Filter, Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';

const bookings = [
  { id: 'b1', guest: 'Alice Johnson', property: 'Sunset Villa', checkIn: '2023-10-24', checkOut: '2023-10-28', status: 'checked_in', amount: '$450', source: 'Airbnb' },
  { id: 'b2', guest: 'Bob Smith', property: 'Downtown Loft', checkIn: '2023-10-26', checkOut: '2023-10-30', status: 'confirmed', amount: '$320', source: 'Booking.com' },
  { id: 'b3', guest: 'Charlie Brown', property: 'Seaside Condo', checkIn: '2023-11-01', checkOut: '2023-11-05', status: 'pending', amount: '$600', source: 'Direct' },
  { id: 'b4', guest: 'Diana Ross', property: 'Mountain Cabin', checkIn: '2023-11-10', checkOut: '2023-11-15', status: 'cancelled', amount: '$0', source: 'Vrbo' },
];

export default function BookingsList() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
            <p className="text-gray-500 mt-1">View and manage reservations.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
                 <CalendarIcon className="mr-2 h-4 w-4" />
                 Calendar View
            </Button>
            <Button>Manual Booking</Button>
          </div>
        </div>

        <Card>
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search guest, ID, or property..." className="pl-9" />
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">Guest</th>
                                <th className="px-6 py-3 font-medium">Property</th>
                                <th className="px-6 py-3 font-medium">Dates</th>
                                <th className="px-6 py-3 font-medium">Channel</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                                <th className="px-6 py-3 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.guest}</td>
                                    <td className="px-6 py-4 text-gray-500">{booking.property}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex flex-col">
                                            <span>In: {booking.checkIn}</span>
                                            <span className="text-xs">Out: {booking.checkOut}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                            {booking.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            booking.status === 'confirmed' || booking.status === 'checked_in' ? 'success' :
                                            booking.status === 'cancelled' ? 'destructive' :
                                            booking.status === 'pending' ? 'warning' : 'default'
                                        }>
                                            {booking.status.replace('_', ' ')}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">{booking.amount}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
