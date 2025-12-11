const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  host_id: {
    type: DataTypes.UUID,
    allowNull: true // Can be null if created by admin or unassigned initially? Spec says references users(id)
  },
  title: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.JSON // jsonb in postgres, JSON in sequelize (mapped to TEXT in sqlite)
  },
  timezone: {
    type: DataTypes.STRING
  },
  default_wifi_ssid: {
    type: DataTypes.STRING
  },
  default_wifi_password: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSON // Array of strings in spec, stored as JSON array
  },
  amenities: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'properties',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Property;
