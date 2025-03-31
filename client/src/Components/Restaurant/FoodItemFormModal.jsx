import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, FormHelperText } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import axios from 'axios';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: #e53e29;
  color: white;
  &:hover {
    background-color: #c13b1d;
  }
`;

const FoodItemFormModal = ({ fetchFoodItems, foodItem, open, onClose }) => {
  const [form, setForm] = useState(foodItem || { name: '', description: '', price: '', discountPrice: '', category: '', image: null });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'image') setForm({ ...form, image: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.description) newErrors.description = 'Description is required';
    if (!form.price) newErrors.price = 'Price is required';
    if (!form.discountPrice) newErrors.discountPrice = 'Discount Price is required';
    if (!form.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if form is invalid

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    try {
      if (foodItem) {
        await axios.put(`http://localhost:5000/food-items/${foodItem._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/food-items', formData);
      }
      fetchFoodItems();
      onClose(); // Close modal after successful submission
    } catch (err) {
      console.error('Error saving food item:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{foodItem ? 'Edit Food Item' : 'Add Food Item'}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="dense"
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          value={form.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          margin="dense"
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          fullWidth
          value={form.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
          margin="dense"
        />
        <TextField
          name="discountPrice"
          label="Discount Price"
          type="number"
          fullWidth
          value={form.discountPrice}
          onChange={handleChange}
          error={!!errors.discountPrice}
          helperText={errors.discountPrice}
          margin="dense"
        />
        <TextField
          name="category"
          select
          label="Category"
          fullWidth
          value={form.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
          margin="dense"
        >
          <MenuItem value="Starter">Starter</MenuItem>
          <MenuItem value="Main Course">Main Course</MenuItem>
          <MenuItem value="Dessert">Dessert</MenuItem>
        </TextField>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required={!foodItem}
          style={{ marginTop: '10px' }}
        />
        {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <StyledButton onClick={handleSubmit} color="primary">
          {foodItem ? 'Update' : 'Add'} Food Item
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default FoodItemFormModal;
