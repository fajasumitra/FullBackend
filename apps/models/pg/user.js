const { DataTypes, Sequelize } = require('sequelize');
const db = require('../../database/dbPG');

const User = db.sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

User.sync({ alter: true });

module.exports = User;