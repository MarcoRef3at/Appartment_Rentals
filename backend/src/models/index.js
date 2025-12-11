const sequelize = require('../config/database');
const User = require('./User');
const Property = require('./Property');
const Guest = require('./Guest');
const Booking = require('./Booking');
const Device = require('./Device');

// Associations

// Property belongs to User (Host)
Property.belongsTo(User, { foreignKey: 'host_id', as: 'host' });
User.hasMany(Property, { foreignKey: 'host_id', as: 'properties' });

// Booking belongs to Property
Booking.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });
Property.hasMany(Booking, { foreignKey: 'property_id', as: 'bookings' });

// Booking belongs to Guest
Booking.belongsTo(Guest, { foreignKey: 'guest_id', as: 'guest' });
Guest.hasMany(Booking, { foreignKey: 'guest_id', as: 'bookings' });

// Device belongs to Property
Device.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });
Property.hasMany(Device, { foreignKey: 'property_id', as: 'devices' });

module.exports = {
  sequelize,
  User,
  Property,
  Guest,
  Booking,
  Device
};
