const JWT = require('jsonwebtoken');
const User = require('../models/pg/user');

const verifyToken = async (req, res, next) => {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT'
    ) {
        try {
            const decoded = JWT.verify(
                req.headers.authorization.split(' ')[1],
                process.env.JWT_SECRET
            );
            const user = await User.findOne({ where: { id: decoded.id } });
            if (!user) {
                return res.status(404).json({ message: 'User Not found.' });
            }
            req.user = user;
            next();
        } catch (error) {
            req.user = undefined;
            next();
        }
    } else {
        req.user = undefined;
        next();
    }
}

module.exports = verifyToken;