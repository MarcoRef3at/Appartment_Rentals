const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'host' // admin, host, staff
  },
  phone: {
    type: DataTypes.STRING
  },
  password_hash: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = User;
