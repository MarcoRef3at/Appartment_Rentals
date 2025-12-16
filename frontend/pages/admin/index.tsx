import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Building2, CalendarDays, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';

// Mock Data
const stats = [
  { label: 'Total Revenue', value: '$12,450', change: '+12%', icon: DollarSign, color: 'text-green-600' },
  { label: 'Occupancy Rate', value: '85%', change: '+5%', icon: TrendingUp, color: 'text-blue-600' },
  { label: 'Active Bookings', value: '12', change: '+2', icon: CalendarDays, color: 'text-purple-600' },
  { label: 'Pending Tasks', value: '5', change: '-1', icon: CheckCircle2, color: 'text-orange-600' },
];

const recentBookings = [
  { id: 1, guest: 'Alice Johnson', property: 'Sunset Villa', dates: 'Oct 24 - Oct 28', status: 'checked_in', amount: '$450' },
  { id: 2, guest: 'Bob Smith', property: 'Downtown Loft', dates: 'Oct 26 - Oct 30', status: 'confirmed', amount: '$320' },
  { id: 3, guest: 'Charlie Brown', property: 'Seaside Condo', dates: 'Nov 01 - Nov 05', status: 'pending', amount: '$600' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your hospitality business.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6 flex items-center justify-between space-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 bg-gray-50 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest reservations across all properties.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {booking.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.guest}</p>
                        <p className="text-sm text-gray-500">{booking.property}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{booking.amount}</p>
                      <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'default'}>
                        {booking.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
             <CardHeader>
              <CardTitle>Properties Overview</CardTitle>
              <CardDescription>Occupancy by property.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Mock Graph Placeholder */}
                <div className="h-[250px] w-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Occupancy Heatmap Visualization
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
