const { apiResponse } = require("../../helpers/httpExecptions");
const multer = require("multer");
const fs = require("fs");
const db = require("../../database/dbPG");
const Obat = require("../../models/pg/obat");
const DetailObat = require("../../models/pg/detail_obat");
const tipe = require("../../models/pg/tipe");
// const { exec } = require('child_process'); // async

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./MedEase-ML/tmp");
  },
  filename: (req, file, cb) => {
    cb(null, "pred_img.jpg");
  },
});

exports.upload = multer({ storage });

exports.createPredict = async (req, res) => {
  try {
    const { execSync } = require("child_process"); // sync

    // Define the Python script path
    const pythonScriptPath = "./MedEase-ML/predictions.py";

    // Run the Python script using execSync (sync)
    try {
      const result = execSync(`python ${pythonScriptPath}`, {
        encoding: "utf-8",
      });
      console.log(result);
    } catch (error) {
      console.error("Error:", error.message);
    }

    // Run the Python script using exec (async)
    // exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error('Error:', error.message);
    //         return;
    //     }
    //     ;
    // });
    const data = fs.readFileSync("./MedEase-ML/result/pred.json", "utf-8");
    const jsonData = JSON.parse(data);

    const result = await Obat.findAll({
      where: {
        nama: jsonData.NAME,
      },
      include: [
        {
          model: tipe,
          as: "tipe",
          attributes: ["nama", "deskripsi"],
        },
        {
          model: DetailObat,
          as: "detail_obat",
          attributes: [
            "indikasi_umum",
            "dewasa",
            "anak",
            "perhatian",
            "efek_samping",
            "kontraIndikasi",
            "link",
          ],
        },
      ],
    });
    if (result.length > 0) {
      res.status(200).json(apiResponse(200, "Success", "Obat Found", result));
    } else {
      res
        .status(404)
        .json(apiResponse(404, "Not Found", "Obat Not Found", result));
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
