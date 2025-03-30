const express = require('express');
const Restaurant = require('../models/Restaurant');  // Assuming you have a Restaurant model
const router = express.Router();

router.get('/restaurants', async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Add a new restaurant
router.post('/restaurants', async (req, res) => {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json(restaurant);
});

// Update a restaurant
router.put('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(restaurant);
});

// Delete a restaurant
router.delete('/restaurants/:id', async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted' });
});

module.exports = router;
