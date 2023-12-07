const obat = require('../../models/pg/obat');
const tipe = require('../../models/pg/tipe');
const detail_obat = require('../../models/pg/detail_obat');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createObat = async (req, res) => {
    const { nama, kapasitas, deskripsi, id_tipe } = req.body;

    try {
        const newObat = new obat({
            nama,
            kapasitas,
            deskripsi,
            id_tipe
        });
        await newObat.save();
        res.status(201).json(apiResponse(201, 'Success', 'Obat Created', newObat));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get all obat, tipe, and detail obat
exports.getAllObat = async (req, res) => {
    try {
        const obats = await obat.findAll({
            include: [
                {
                    model: tipe,
                    attributes: ['nama', 'deskripsi'],
                },
                {
                    model: detail_obat,
                    attributes: ['indikasi_umum', 'dewasa', 'anak', 'perhatian', 'efek_samping', 'kontraIndikasi', 'link'],
                }
            ],
        });
        res.status(200).json(apiResponse(200, 'Success', 'Obat, Tipe, and Detail Obat', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//get obat by id and tipe
exports.getObatById = async (req, res) => {
    const { id } = req.params;
    try {
        const obats = await obat.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: tipe,
                    attributes: ['nama', 'deskripsi'],
                },
            ],
        });
        res.status(200).json(apiResponse(200, 'Success', 'Obat and Tipe', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateObat = async (req, res) => {
    const { id } = req.params;
    const { nama, kapasitas, deskripsi, id_tipe } = req.body;
    try {
        const obats = await obat.update({
            nama,
            kapasitas,
            deskripsi,
            id_tipe
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Obat Updated', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteObat = async (req, res) => {
    const { id } = req.params;
    try {
        const obats = await obat.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Obat Deleted', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}