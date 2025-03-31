const express = require('express');
const multer = require('multer');
const FoodItem = require('../../Database/models/FoodItem'); // Import FoodItem model
const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Create Food Item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, discountPrice, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newFoodItem = new FoodItem({ name, description, price, discountPrice, category, image });
    await newFoodItem.save();

    res.status(201).json({ message: 'Food item added successfully', foodItem: newFoodItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding food item', error: error.message });
  }
});

// Get All Food Items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items', error: error.message });
  }
});

// Update Food Item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, discountPrice, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    await FoodItem.findByIdAndUpdate(req.params.id, { name, description, price, discountPrice, category, image });
    res.json({ message: 'Food item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating food item', error: error.message });
  }
});

// Delete Food Item
router.delete('/:id', async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item', error: error.message });
  }
});

module.exports = router;
