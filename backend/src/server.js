const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Ultimate Smart Hospitality Platform Backend is running');
});

// Mock Guest Portal Data
app.get('/api/guest-portal/:bookingId', (req, res) => {
  const { bookingId } = req.params;

  // Mock data simulation
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
    houseRules: [
      "No smoking",
      "Quiet hours after 10 PM",
      "No parties"
    ],
    guide: {
      restaurants: ["Ocean Blue", "The Grill"],
      attractions: ["Beach Walk", "City Museum"]
    }
  };

  res.json(mockBooking);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
