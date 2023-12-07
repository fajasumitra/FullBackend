const tipe = require('../../models/pg/tipe');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createTipe = async (req, res) => {
    const { nama, deskripsi } = req.body;
    try {
        const newTipe = new tipe({
            nama,
            deskripsi,
        });
        await newTipe.save();
        res.status(201).json(apiResponse(201, 'Success', 'Tipe Created', newTipe));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllTipe = async (req, res) => {
    try {
        const tipes = await tipe.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All Tipe', tipes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getTipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const tipes = await tipe.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Tipe', tipes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTipe = async (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    try {
        const tipes = await tipe.update({
            nama,
            deskripsi,
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Tipe Updated', tipes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteTipe = async (req, res) => {
    const { id } = req.params;
    try {
        const tipes = await tipe.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Tipe Deleted', tipes));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}