const { DataTypes } = require("sequelize");
const db = require("../../database/dbPG");
const Tipe = require("./tipe");
const DetailObat = require("./detail_obat");

const Obat = db.sequelize.define("obat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  kapasitas: {
    type: DataTypes.ARRAY(DataTypes.FLOAT),
    allowNull: true,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

DetailObat.belongsTo(Obat, { foreignKey: "id_obat", as: "obat" });
Obat.belongsTo(Tipe, { foreignKey: "id_tipe", as: "tipe" });
Obat.hasOne(DetailObat, { foreignKey: "id_obat", as: "detail_obat" });

Obat.sync({ alter: true });

module.exports = Obat;
