const express = require('express');
const Restaurant = require('../Database/models/Restaurant'); // Ensure correct path

const router = express.Router();

// ✅ Get All Restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
