import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormHelperText } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 10px;
`;

const StyledTypography = styled(Typography)`
  color: #e53e29;
  text-align: center;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  background-color: #e53e29;
  color: white;
  &:hover {
    background-color: #c13b1d;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 2rem;
`;

const StyledTableCell = styled(TableCell)`
  color: #333;
`;

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cuisine: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    location: '',
    cuisine: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/restaurants');
      setRestaurants(response.data);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setFormData({ name: '', location: '', cuisine: '', email: '', password: '', phone: '', address: '' });
    setSelectedRestaurant(null);
    setErrors({});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.cuisine) newErrors.cuisine = 'Cuisine is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Stop if form is invalid
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/restaurants/${selectedRestaurant._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/restaurants', formData);
      }
      fetchRestaurants();
      handleClose();
    } catch (err) {
      console.error('Error saving restaurant:', err);
    }
  };

  const handleEdit = (restaurant) => {
    setEditMode(true);
    setSelectedRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      location: restaurant.location,
      cuisine: restaurant.cuisine,
      email: restaurant.email || '',
      password: '',
      phone: restaurant.phone || '',
      address: restaurant.address || ''
    });
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restaurants/${id}`);
      fetchRestaurants();
    } catch (err) {
      console.error('Error deleting restaurant:', err);
    }
  };

  return (
    <StyledContainer>
      <StyledTypography variant="h4" gutterBottom>
        Manage Restaurants
      </StyledTypography>

      <StyledButton
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add Restaurant
      </StyledButton>

      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Cuisine</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <StyledTableCell>{restaurant.name}</StyledTableCell>
                <StyledTableCell>{restaurant.email}</StyledTableCell>
                <StyledTableCell>{restaurant.phone}</StyledTableCell>
                <StyledTableCell>{restaurant.location}</StyledTableCell>
                <StyledTableCell>{restaurant.cuisine}</StyledTableCell>
                <StyledTableCell>
                  <StyledButton
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(restaurant)}
                  >
                    Edit
                  </StyledButton>
                  <StyledButton
                    color="secondary"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    Delete
                  </StyledButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            margin="dense"
            label="Cuisine"
            name="cuisine"
            fullWidth
            value={formData.cuisine}
            onChange={handleChange}
            error={!!errors.cuisine}
            helperText={errors.cuisine}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default ManageRestaurants;
