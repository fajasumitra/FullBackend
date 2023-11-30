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
        type: DataTypes.TIME,
        allowNull: false,
    },
    time_end: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    jam : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

Schedule.belongsTo(history, { foreignKey: 'id_history' });

Schedule.sync({ alter: true });

module.exports = Schedule;
