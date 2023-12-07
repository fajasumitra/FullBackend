const { DataTypes } = require('sequelize');
const db = require('../../database/dbPG');
const history = require('./history');

const Schedule = db.sequelize.define('schedule', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time_start: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time_end: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam : {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Schedule.belongsTo(history, { foreignKey: 'id_history' });

Schedule.sync({ alter: true });

module.exports = Schedule;
