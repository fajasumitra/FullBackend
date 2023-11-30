const user = require('../../models/pg/user');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { apiResponse } = require('../../helpers/httpExecptions');
require('dotenv').config();

exports.createUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const newUser = new user({
        email,
        username,
        password,
        });
        const salt = await bycrypt.genSalt(10);
        newUser.password = await bycrypt.hash(password, salt);
        await newUser.save();
        res.status(201).json(apiResponse(201, 'Success', 'User Created', newUser));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await user.findOne({ where: { email } });
        if (!foundUser) {
            return res.status(401).json(apiResponse(401, 'Error', 'Invalid Credentials', null));
        }
        const isMatch = await bycrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json(apiResponse(401, 'Error', 'Invalid Credentials', null));
        }
        const payload = {
            id: foundUser.id,
            username: foundUser.username,
        };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json(apiResponse(200, 'Success', 'Login Success', { token }));
    } catch (error) {
        res.status(500).json(apiResponse(500, 'Error', error.message, null));
    }
}

exports.getUser = async (req, res) => {
    try {
        const foundUser = await user.findAll();
        res.status(200).json(apiResponse(200, 'Success', 'User Found', foundUser));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}