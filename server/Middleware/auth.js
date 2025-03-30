const jwt = require('jsonwebtoken');
const User = require('../Database/models/user');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
    const token = req.header('Authentication')?.replace('Bearer ', '');
    
    if (!token) {
        console.log(token);
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        console.log("User found: ", user);

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied. Admins only.' });
        }
        next();
    } catch (error) {
        res.status(403).json({ message: 'You have to logged into the system' });
    }
};

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            console.log("Expected Role: ", role);
            console.log("User's Role: ", req.user.role);
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    }
}
module.exports = { authenticate, authorize};


