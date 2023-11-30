const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DbPG_NAME, process.env.DbPG_USER, process.env.DbPG_PASSWORD, {
    host: process.env.DbPG_HOST,
    dialect: 'postgres',
    logging: false
});
const connectDbPG = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    connectDbPG
}