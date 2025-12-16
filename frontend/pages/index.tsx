import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Building2, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>SmartStay | Hospitality Platform</title>
      </Head>

      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="text-2xl font-bold text-primary-600">SmartStay</div>
            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/login">
                    <Button>Get Started</Button>
                </Link>
            </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <div className="relative overflow-hidden pt-16 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">The Ultimate Smart</span>
                    <span className="block text-primary-600">Hospitality Platform</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
                    Seamless guest experiences, automated operations, and smart home control—all in one place.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Link href="/login">
                         <Button size="lg">Start Free Trial</Button>
                    </Link>
                    <Link href="/guest/demo">
                        <Button size="lg" variant="outline">View Guest Demo</Button>
                    </Link>
                </div>
            </div>
        </div>

        {/* Features */}
        <div className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Property Management</h3>
                        <p className="mt-2 text-gray-500">Manage bookings, calendars, and rates across all channels from a single dashboard.</p>
                    </div>
                     <div className="text-center">
                        <div className="mx-auto h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Smart Automation</h3>
                        <p className="mt-2 text-gray-500">Auto-generate door codes, control AC/Lights, and save energy when guests leave.</p>
                    </div>
                     <div className="text-center">
                        <div className="mx-auto h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Secure Guest Portal</h3>
                        <p className="mt-2 text-gray-500">Mobile-first microsite for every booking. ID verification, guidebooks, and upsells.</p>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            &copy; 2024 SmartStay Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
