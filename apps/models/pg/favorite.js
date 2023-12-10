const { DataTypes, Sequelize } = require("sequelize");
const db = require("../../database/dbPG");
const user = require("./user");
const Obat = require("./obat");

const Favorite = db.sequelize.define("favorite", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

Favorite.belongsTo(user, { foreignKey: "id_user" });
Favorite.belongsTo(Obat, { foreignKey: "id_obat" });

Favorite.sync({ alter: true });

module.exports = Favorite;
