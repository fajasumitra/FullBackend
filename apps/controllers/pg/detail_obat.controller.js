const detail_obat = require('../../models/pg/detail_obat');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createDetailObat = async (req, res) => {
    const { indikasi_umum, dewasa, anak, perhatian, efek_samping, kontraIndikasi, link, id_obat } = req.body;

    try {
        const newDetailObat = new detail_obat({
            indikasi_umum,
            dewasa,
            anak,
            perhatian,
            efek_samping,
            kontraIndikasi,
            link,
            id_obat
        });
        await newDetailObat.save();
        res.status(201).json(apiResponse(201, 'Success', 'Detail Obat Created', newDetailObat));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllDetailObat = async (req, res) => {
    try {
        const detailObats = await detail_obat.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All Detail Obat', detailObats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getDetailObatById = async (req, res) => {
    const { id } = req.params;
    try {
        const detailObats = await detail_obat.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Detail Obat', detailObats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateDetailObat = async (req, res) => {
    const { id } = req.params;
    const { indikasi_umum, dewasa, anak, perhatian, efek_samping, kontraIndikasi, link, id_obat } = req.body;
    try {
        const detailObats = await detail_obat.update({
            indikasi_umum,
            dewasa,
            anak,
            perhatian,
            efek_samping,
            kontraIndikasi,
            link,
            id_obat
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Detail Obat Updated', detailObats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteDetailObat = async (req, res) => {
    const { id } = req.params;
    try {
        await detail_obat.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Detail Obat Deleted', null));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

