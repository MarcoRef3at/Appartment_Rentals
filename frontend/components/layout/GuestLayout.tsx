import React from 'react';
import Head from 'next/head';

interface GuestLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <Head>
        <title>{title ? `${title} | SmartStay` : 'SmartStay Guest Portal'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main className="w-full max-w-md flex-1 bg-white min-h-screen shadow-2xl relative">
        {children}
      </main>
    </div>
  );
};

export default GuestLayout;
