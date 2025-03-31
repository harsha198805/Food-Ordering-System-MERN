import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';

const FoodItemForm = ({ fetchFoodItems, foodItem, handleClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({}); // Error state for tracking validation errors

  useEffect(() => {
    if (foodItem) {
      setName(foodItem.name);
      setDescription(foodItem.description);
      setPrice(foodItem.price);
      setDiscountPrice(foodItem.discountPrice);
      setCategory(foodItem.category);
      setImage(foodItem.image);
    }
  }, [foodItem]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!price || price <= 0) newErrors.price = 'Price must be a positive number';
    if (!discountPrice || discountPrice < 0) newErrors.discountPrice = 'Discount Price must be a non-negative number';
    if (!category) newErrors.category = 'Category is required';
    if (!image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form before submitting
    if (!validateForm()) return; // If validation fails, prevent submission

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (foodItem) {
        // Update the food item
        await axios.put(`http://localhost:5000/food-items/${foodItem._id}`, formData);
      } else {
        // Create a new food item
        await axios.post('http://localhost:5000/food-items', formData);
      }

      fetchFoodItems(); // Refresh the list of food items
      handleClose(); // Close the modal after submit
    } catch (error) {
      console.error('Error while saving food item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        style={{ marginBottom: '15px' }}
        error={!!errors.name} // Show error if there's an error for this field
        helperText={errors.name} // Show error message below the field
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        style={{ marginBottom: '15px' }}
        error={!!errors.description}
        helperText={errors.description}
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        style={{ marginBottom: '15px' }}
        error={!!errors.price}
        helperText={errors.price}
      />
      <TextField
        label="Discount Price"
        type="number"
        value={discountPrice}
        onChange={(e) => setDiscountPrice(e.target.value)}
        fullWidth
        style={{ marginBottom: '15px' }}
        error={!!errors.discountPrice}
        helperText={errors.discountPrice}
      />
      <FormControl fullWidth style={{ marginBottom: '15px' }} error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
        <MenuItem value="Rice and Curry">Rice and Curry</MenuItem>
        <MenuItem value="Kottu">Kottu</MenuItem>
        <MenuItem value="Hoppers">Hoppers</MenuItem>
        <MenuItem value="String Hoppers">String Hoppers</MenuItem>
        <MenuItem value="Pittu">Pittu</MenuItem>
        <MenuItem value="Roti">Roti</MenuItem>
        <MenuItem value="Seafood Dishes">Seafood Dishes</MenuItem>
        <MenuItem value="Snacks">Snacks</MenuItem>
        <MenuItem value="Sambol">Sambol</MenuItem>
        <MenuItem value="Sweets">Sweets</MenuItem>
        <MenuItem value="Beverages">Beverages</MenuItem>
        <MenuItem value="Burger">Burger</MenuItem>
        <MenuItem value="Pizza">Pizza</MenuItem>
        <MenuItem value="Pasta">Pasta</MenuItem>
        <MenuItem value="Fried Chicken">Fried Chicken</MenuItem>
        <MenuItem value="Salads">Salads</MenuItem>
        <MenuItem value="Desserts">Desserts</MenuItem>
        </Select>
        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
      </FormControl>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: '15px' }}
      />
      {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
      <Button type="submit" variant="contained" color="primary">
        {foodItem ? 'Update Food Item' : 'Add Food Item'}
      </Button>
    </form>
  );
};

export default FoodItemForm;
