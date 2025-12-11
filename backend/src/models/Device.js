const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  property_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING // tuya/fibaro/shelly/tapo
  },
  provider_device_id: {
    type: DataTypes.STRING
  },
  device_type: {
    type: DataTypes.STRING // lock/light/ac/plug/curtain
  },
  meta: {
    type: DataTypes.JSON
  },
  last_seen: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'devices',
  timestamps: false // Schema says last_seen, no created_at in spec but SQL sample has none. I will follow SQL sample which has no created_at, only last_seen
});

module.exports = Device;
