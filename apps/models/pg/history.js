const { DataTypes, Sequelize } = require('sequelize');
const db = require('../../database/dbPG');
const user = require('./user');
const obat = require('./obat');

const History = db.sequelize.define('history', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    UpdatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
})

History.belongsTo(user, { foreignKey: 'id_user' });
History.belongsTo(obat, { foreignKey: 'id_obat' });

History.sync({ alter: true });

module.exports = History;