const express = require('express');
const Restaurant = require('../../Database/models/Restaurant');
const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new restaurant
router.post('/', async (req, res) => {
    const restaurant = new Restaurant({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    });

    try {
        const newRestaurant = await restaurant.save();
        res.status(201).json(newRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a restaurant
router.put('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        restaurant.name = req.body.name || restaurant.name;
        restaurant.location = req.body.location || restaurant.location;
        restaurant.cuisine = req.body.cuisine || restaurant.cuisine;

        const updatedRestaurant = await restaurant.save();
        res.json(updatedRestaurant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        await restaurant.deleteOne(); // Use deleteOne instead of remove
        res.json({ message: 'Restaurant deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
