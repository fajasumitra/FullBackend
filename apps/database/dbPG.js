const Sequelize = require('sequelize');
const {Client} = require('pg');
const { create } = require('../models/user');

const connectDbPG = async () => {
    try {
        const sequelize = new Sequelize(process.env.DbPG_NAME, process.env.DbPG_USER, process.env.DbPG_PASSWORD, {
            host: process.env.DbPG_HOST,
            dialect: 'postgres',
            logging: false
        });
        await sequelize.authenticate();
        console.log("PostgreSQL connected");

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDbPG;