const { DataTypes } = require('sequelize');
const db = require('../../database/dbPG');

const Tipe = db.sequelize.define('tipe', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Tipe.sync({ alter: true });

module.exports = Tipe;