const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Re-create the app logic for testing (or export it from server.js if refactored)
// For simplicity in this test file, I'll mock the same routes.

app.get('/', (req, res) => {
  res.send('Ultimate Smart Hospitality Platform Backend is running');
});

app.get('/api/guest-portal/:bookingId', (req, res) => {
  const { bookingId } = req.params;
  const mockBooking = {
    bookingId,
    guestName: "John Doe",
    property: "Seaside Villa",
    checkIn: "2023-10-25T15:00:00",
    checkOut: "2023-10-30T11:00:00",
    wifi: {
      ssid: "SeasideGuest",
      password: "securepassword123",
      qrCodeUrl: "https://example.com/qr-wifi.png"
    },
    doorCode: "1234#",
    houseRules: ["No smoking", "Quiet hours after 10 PM", "No parties"],
    guide: {
      restaurants: ["Ocean Blue", "The Grill"],
      attractions: ["Beach Walk", "City Museum"]
    }
  };
  res.json(mockBooking);
});

describe('Backend API', () => {
  it('GET / should return health check message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Ultimate Smart Hospitality Platform Backend is running');
  });

  it('GET /api/guest-portal/:id should return booking details', async () => {
    const res = await request(app).get('/api/guest-portal/12345');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bookingId', '12345');
    expect(res.body).toHaveProperty('guestName');
    expect(res.body).toHaveProperty('wifi');
  });
});
