const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization'); // Make sure you send the token in the request header from the client

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify the JWT token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // Check if the user role is 'admin'
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied. Admins only.' });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyAdmin;
