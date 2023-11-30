const { DataTypes } = require('sequelize');
const db = require('../../database/dbPG');
const Tipe = require('./tipe');

const Obat = db.sequelize.define('obat', {
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
    kapasitas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Obat.belongsTo(Tipe, { foreignKey: 'id_tipe' });

Obat.sync({ alter: true });

module.exports = Obat;
