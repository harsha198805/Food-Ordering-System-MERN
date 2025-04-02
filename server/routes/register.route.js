const express = require('express');
const User = require('../Database/models/user');  // Assuming the User model is as you provided
const bcrypt = require('bcrypt');
const router = express.Router();

// POST /api/register
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'All fields are required'
            });
        }

        // Validate email format (basic)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid email format'
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password and default role
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user' // Set the default role as 'user'
        });

        // Save the user to the database
        await user.save();

        // Send a success response
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        let errorMessage;

        if (err.code === 11000) {
            // Handle duplicate key error (email)
            errorMessage = 'Email already exists';
        } else if (err.name === 'ValidationError') {
            // Handle Mongoose validation error
            errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
        } else {
            // Generic error message
            errorMessage = err.message;
        }

        // Send a failed response
        res.status(500).json({
            status: 'failed',
            message: errorMessage
        });
    }
});

module.exports = router;
