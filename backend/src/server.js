const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const bookingController = require('./controllers/bookingController');
const guestController = require('./controllers/guestController');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sync Database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

// Routes

// Auth
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Properties
app.get('/api/properties', authenticateToken, propertyController.getProperties);
app.post('/api/properties', authenticateToken, propertyController.createProperty);
app.get('/api/properties/:id', authenticateToken, propertyController.getProperty);
app.put('/api/properties/:id', authenticateToken, propertyController.updateProperty);
app.delete('/api/properties/:id', authenticateToken, propertyController.deleteProperty);

// Bookings
app.get('/api/bookings', authenticateToken, bookingController.getBookings);
app.post('/api/bookings', authenticateToken, bookingController.createBooking);
app.get('/api/bookings/:id', authenticateToken, bookingController.getBooking);

// Guests (Helper for testing flow)
app.post('/api/guests', authenticateToken, guestController.createGuest);
app.get('/api/guests', authenticateToken, guestController.getGuests);

// Health Check
app.get('/', (req, res) => {
  res.send('Ultimate Smart Hospitality Platform Backend is running');
});

// Export app for testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
