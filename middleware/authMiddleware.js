const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            // Extract token (remove 'Bearer')
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch user from DB, excluding password
            req.user = await UserModel.findById(decoded.id).select('-password');
            req.userId = decoded.id;

            if(!req.user) {
                return res.status(401).json({success: false, message: 'User not found' });
            }

            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({success: false, message: 'Not authorized, token failed' });
        }
    }
    if(!token) {
        return res.status(401).json({success: false, message: 'Not authorized, no token' });
    }
};

module.exports = protect;