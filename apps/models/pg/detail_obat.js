const { DataTypes } = require("sequelize");
const db = require("../../database/dbPG");
const Obat = require("./obat");

const DetailObat = db.sequelize.define("detail_obat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  indikasi_umum: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dewasa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anak: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perhatian: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  efek_samping: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kontraIndikasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_obat: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

DetailObat.sync({ alter: true });

module.exports = DetailObat;
