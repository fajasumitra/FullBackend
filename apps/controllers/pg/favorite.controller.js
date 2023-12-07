const favorite = require('../../models/pg/favorite');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createFavorite = async (req, res) => {
    const {id_user, id_obat} = req.body;
    try {
        const newFavorite = new favorite({
            id_user,
            id_obat,
        });
        await newFavorite.save();
        res.status(201).json(apiResponse(201, 'Success', 'Favorite Created', newFavorite));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAllFavorite = async (req, res) => {
    try {
        const favorites = await favorite.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'All Favorite', favorites));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFavoriteById = async (req, res) => {
    const { id } = req.params;
    try {
        const favorites = await favorite.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Favorite', favorites));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateFavorite = async (req, res) => {
    const { id } = req.params;
    const { id_user, id_obat } = req.body;
    try {
        const favorites = await favorite.update({
            id_user,
            id_obat,
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Favorite Updated', favorites));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const favorites = await favorite.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse(200, 'Success', 'Favorite Deleted', favorites));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteAllFavorite = async (req, res) => {
    try {
        const favorites = await favorite.destroy({
            where: {},
            truncate: false,
        });
        res.status(200).json(apiResponse(200, 'Success', 'All Favorite Deleted', favorites));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}