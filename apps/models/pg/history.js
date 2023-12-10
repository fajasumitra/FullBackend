const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../database/dbPG");
const user = require("./user");
const Obat = require("./obat");

const History = db.sequelize.define("history", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

History.belongsTo(user, { foreignKey: "id_user" });
History.belongsTo(Obat, { foreignKey: "id_obat" });

History.sync({ alter: true });

module.exports = History;
