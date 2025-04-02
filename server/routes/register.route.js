const express = require('express');
const User = require('../Database/models/user');  // Assuming the User model is as you provided
const bcrypt = require('bcrypt');
const router = express.Router();

const jwt = require("jsonwebtoken");

// Generate JWT token function
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, "your_secret_key", {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email format",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      token,  // Include token
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    let errorMessage = "Something went wrong";

    if (err.code === 11000) {
      errorMessage = "Email already exists";
    } else if (err.name === "ValidationError") {
      errorMessage = Object.values(err.errors).map((val) => val.message).join(", ");
    } else {
      errorMessage = err.message;
    }

    res.status(500).json({
      status: "failed",
      message: errorMessage,
    });
  }
});

module.exports = router;
