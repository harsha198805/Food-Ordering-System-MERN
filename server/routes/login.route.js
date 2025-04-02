const express = require('express');
const jwt = require('jsonwebtoken'); // Import JWT
const User = require('../Database/models/user'); // User model
const bcrypt = require('bcrypt');
const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY; 
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 'failed', message: 'Invalid email' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: 'failed', message: 'Invalid password' });
        }

        // Generate JWT Token
        const authToken = jwt.sign(
            { userId: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' } // Token valid for 1 hour
        );

        // Send success response with the token
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            authToken,  // Include authToken in the response
            userRole: user.role
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'failed', message: 'An error occurred' });
    }
});

module.exports = router;
