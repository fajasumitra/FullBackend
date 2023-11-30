const { DataTypes, Sequelize } = require('sequelize');
const db = require('../../database/dbPG');
const user = require('./user');

const Profile = db.sequelize.define('profile', {
  id : {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
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

Profile.belongsTo(user, { foreignKey: 'user_id' });

Profile.sync({ alter: true });

module.exports = Profile;