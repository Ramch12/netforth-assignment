require('dotenv').config({ path: '../config/.env' });
const jwt = require('jsonwebtoken');

// function for validating the userdata

module.exports = function (req, res, next) {

    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({status:0,'message': "Access denied.No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.Private_key);
        next();
    }
    catch (err) {
        res.status(400).json({ 'message': 'invalid token' });
    }
    
}