import React from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Plus, MapPin, Wifi, Users } from 'lucide-react';
import Link from 'next/link';

// Mock Data
const properties = [
  {
    id: '1',
    title: 'Sunset Villa',
    address: '123 Ocean Dr, Miami, FL',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'occupied',
    guests: 4,
    rating: 4.9
  },
  {
    id: '2',
    title: 'Downtown Loft',
    address: '456 Main St, New York, NY',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'vacant',
    guests: 2,
    rating: 4.7
  },
  {
    id: '3',
    title: 'Mountain Cabin',
    address: '789 Pine Rd, Aspen, CO',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    status: 'maintenance',
    guests: 6,
    rating: 4.8
  },
];

export default function PropertiesList() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Properties</h1>
            <p className="text-gray-500 mt-1">Manage your units and listings.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <Link href={`/admin/properties/${property.id}`} key={property.id} className="group">
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="aspect-video w-full relative overflow-hidden bg-gray-200">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                     <Badge variant={property.status === 'occupied' ? 'success' : property.status === 'maintenance' ? 'warning' : 'secondary'}>
                        {property.status}
                     </Badge>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">{property.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            {property.address}
                        </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {property.guests} Guests
                        </span>
                        <span className="flex items-center gap-1">
                            <Wifi className="h-4 w-4" />
                            Fast Wifi
                        </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
