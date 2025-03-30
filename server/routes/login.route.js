const express = require('express');
const User = require('../Database/models/user'); // Import your User model
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if a user exists with the given email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email'
            });
        }

        // Check if the input password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid password'
            });
        }
        
        // Send a success response with user role
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            userRole: user.role  // Assuming your User model has a `role` field
        });

    } catch (err) {
        console.error(err);

        // Send a failed response
        res.status(500).json({
            status: 'failed',
            message: 'An error occurred while processing your request'
        });
    }
});

module.exports = router;
