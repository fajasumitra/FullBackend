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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dewasa: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  anak: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  perhatian: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  efek_samping: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  kontraIndikasi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  golongan : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  komposisi : {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  id_obat: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

DetailObat.sync({ alter: true });

module.exports = DetailObat;
