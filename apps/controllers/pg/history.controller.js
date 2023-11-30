const history = require('../../models/pg/history');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createHistory = async (req, res) => {
    const {id_user, id_obat} = req.body;
    try {
        const newHistory = new history({
            id_user,
            id_obat,
        });
        await newHistory.save();
        res.status(201).json(apiResponse(201, 'Success', 'History Created', newHistory));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllHistory = async (req, res) => {
    try {
        const histories = await history.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All History', histories));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getHistoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const histories = await history.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'History', histories));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const histories = await history.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'History Deleted', histories));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAllHistory = async (req, res) => {
    try {
        const histories = await history.destroy({
            where: {},
            truncate: false,
        });
        res.status(200).json(apiResponse(200, 'Success', 'All History Deleted', histories));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}