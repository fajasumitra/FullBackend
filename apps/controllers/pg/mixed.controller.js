const profile = require("../../models/pg/profile.js");
const user = require("../../models/pg/user.js");
const obat = require("../../models/pg/obat");
const detail_obat = require("../../models/pg/obat");
const tipe = require("../../models/pg/tipe.js");
const apiResponse = require("../../helpers/httpExecptions.js");

//get both user and profile
exports.getProfileAndUser = async (req, res) => {
  try {
    const profiles = await profile.findAll({
      include: [
        {
          model: user,
          as: "user",
        },
      ],
    });
    res
      .status(200)
      .json(apiResponse.apiResponse(200, "Success", "All Profile", profiles));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create both user and profile
exports.createProfileAndUser = async (req, res) => {
    const {email, username, password, name, birthdate, phoneNumber} = req.body;
    try {
        const newUser = new user({
            email,
            username,
            password,
        });
        await newUser.save();
        const newProfile = new profile({
            name,
            birthdate,
            phoneNumber,
            user_id: newUser.id,
        });
        await newProfile.save();
        res.status(201).json(apiResponse.apiResponse(201, 'Success', 'Profile Created', newProfile));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//update both user and profile
exports.updateProfileAndUser = async (req, res) => {
    const {email, username, password, name, birthdate, phoneNumber} = req.body;
    const { id } = req.params;
    try {
        const updateUser = await user.update({
            email,
            username,
            password,
        }, {
            where: {
                id: id,
            },
        });
        const updateProfile = await profile.update({
            name,
            birthdate,
            phoneNumber,
        }, {
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse.apiResponse(200, 'Success', 'Profile Updated', updateProfile));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//delete user and profile
exports.deleteProfileAndUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProfile = await profile.destroy({
            where: {
                id: id,
            },
        });
        const deleteUser = await user.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json(apiResponse.apiResponse(200, 'Success', 'Profile Deleted', deleteUser));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all obat, detail_obat, tipe
exports.GetAllObatDetailObat= async (req, res) => {
    try {
        const obats = await obat.findAll({
        include: [
            {
            model: detail_obat,
            as: "detail_obat",
            },
            {
            model: tipe,
            as: "tipe",
            },
        ],
        });
        res
        .status(200)
        .json(apiResponse.apiResponse(200, "Success", "All Obat", obats));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}