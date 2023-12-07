const profile = require('../../models/pg/profile');
const { apiResponse } = require('../../helpers/httpExecptions');

exports.createProfile = async (req, res) => {
    const { name, birthdate, phoneNumber, user_id } = req.body;
    try {
        const newProfile = new profile({
            name,
            birthdate,
            phoneNumber,
            user_id
        });
        await newProfile.save();
        res.status(201).json(apiResponse(201, 'Success', 'Profile Created', newProfile));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const foundProfile = await profile.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'Profile Found', foundProfile));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getProfileById = async (req, res) => {
    const { id } = req.params;
    try {
        const foundProfile = await profile.findOne({ where: { id } });
        if (foundProfile) {
            res.status(200).json(apiResponse(200, 'Success', 'Profile Found', foundProfile));
        } else {
            res.status(404).json(apiResponse(404, 'Error', 'Profile Not Found', null));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, birthdate, phoneNumber, user_id } = req.body;
    try {
        const foundProfile = await profile.findOne({ where: { id } });
        if (foundProfile) {
            await foundProfile.update({
                name,
                birthdate,
                phoneNumber,
                user_id
            });
            res.status(200).json(apiResponse(200, 'Success', 'Profile Updated', foundProfile));
        } else {
            res.status(404).json(apiResponse(404, 'Error', 'Profile Not Found', null));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const foundProfile = await profile.findOne({ where: { id } });
        if (foundProfile) {
            await foundProfile.destroy();
            res.status(200).json(apiResponse(200, 'Success', 'Profile Deleted', null));
        } else {
            res.status(404).json(apiResponse(404, 'Error', 'Profile Not Found', null));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get profile by user id
exports.getProfileByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const foundProfile = await profile.findOne({ where: { user_id: id } });
        if (foundProfile) {
            res.status(200).json(apiResponse(200, 'Success', 'Profile Found', foundProfile));
        } else {
            res.status(404).json(apiResponse(404, 'Error', 'Profile Not Found', null));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}