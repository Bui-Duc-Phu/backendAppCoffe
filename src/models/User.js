const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../configs/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    allowEmpty: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  typePassword: {
    type: DataTypes.ENUM('admin', 'user', 'shipper'),
    allowNull: false,
    defaultValue : 'user'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = User;
