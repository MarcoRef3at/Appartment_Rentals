import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

interface Wifi {
  ssid: string;
  password: string;
  qrCodeUrl: string;
}

interface Guide {
  restaurants: string[];
  attractions: string[];
}

interface Booking {
  bookingId: string;
  guestName: string;
  property: string;
  checkIn: string;
  checkOut: string;
  wifi: Wifi;
  doorCode: string;
  houseRules: string[];
  guide: Guide;
}

export default function Home() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, the booking ID would likely come from the URL query params.
    // For this prototype, we'll hardcode or simulate a booking ID.
    const bookingId = '12345';

    axios.get(`http://localhost:5000/api/guest-portal/${bookingId}`)
      .then(response => {
        setBooking(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching booking data:', err);
        setError('Failed to load booking details.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading Guest Portal...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!booking) return null;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>Guest Portal - {booking.property}</title>
      </Head>

      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Welcome to {booking.property}, {booking.guestName}!</h1>
        <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleString()}</p>
        <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleString()}</p>
      </header>

      <section style={{ marginBottom: '20px' }}>
        <h2>🏠 Access & Instructions</h2>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
          <p><strong>Door Code:</strong> <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{booking.doorCode}</span></p>
          <p>To unlock, enter the code on the keypad followed by the '#' key.</p>
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>📶 WiFi</h2>
        <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
          <p><strong>Network:</strong> {booking.wifi.ssid}</p>
          <p><strong>Password:</strong> {booking.wifi.password}</p>
          {/* <img src={booking.wifi.qrCodeUrl} alt="WiFi QR Code" style={{ maxWidth: '150px' }} /> */}
        </div>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>📜 House Rules</h2>
        <ul>
          {booking.houseRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>🗺️ Local Guide</h2>
        <h3>Restaurants</h3>
        <ul>
          {booking.guide.restaurants.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
        <h3>Attractions</h3>
        <ul>
          {booking.guide.attractions.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
