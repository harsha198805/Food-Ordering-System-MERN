const mongoose = require('mongoose');

// Define a new schema for user registration
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin','restaurant'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true,     // Ensures email addresses are unique in the collection
        lowercase: true,  // Stores the email in lowercase
        trim: true,        // Removes leading and trailing whitespaces
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 128
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema, 'user');

// Export the User model
module.exports = User;
