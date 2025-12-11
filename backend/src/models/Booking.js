const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  property_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  guest_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  channel: {
    type: DataTypes.STRING, // airbnb/booking/vrbo/manual
    defaultValue: 'manual'
  },
  channel_reservation_id: {
    type: DataTypes.STRING
  },
  start_date: {
    type: DataTypes.DATEONLY
  },
  end_date: {
    type: DataTypes.DATEONLY
  },
  status: {
    type: DataTypes.STRING, // pending/confirmed/checked_in/checked_out/cancelled
    defaultValue: 'pending'
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  currency: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Booking;
