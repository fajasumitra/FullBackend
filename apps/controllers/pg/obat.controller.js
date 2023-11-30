const obat = require('../../models/pg/obat');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createObat = async (req, res) => {
    const { nama, kapasitas, deskripsi, tipe_id } = req.body;

    try {
        const newObat = new obat({
            nama,
            kapasitas,
            deskripsi,
            tipe_id
        });
        await newObat.save();
        res.status(201).json(apiResponse(201, 'Success', 'Obat Created', newObat));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllObat = async (req, res) => {
    try {
        const obats = await obat.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All Obat', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getObatById = async (req, res) => {
    const { id } = req.params;
    try {
        const obats = await obat.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Obat', obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateObat = async (req, res) => {
    const { id } = req.params;
    const { nama, kapasitas, deskripsi, tipe_id } = req.body;
    try {
        const obats = await obat.update({
            nama,
            kapasitas,
            deskripsi,
            tipe_id
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