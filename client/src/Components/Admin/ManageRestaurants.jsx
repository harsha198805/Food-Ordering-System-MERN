import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slider } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import styled from 'styled-components';

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
  const [open, setOpen] = useState(false); // For add/edit form dialog
  const [editMode, setEditMode] = useState(false); // Track if we're editing or adding
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // For the selected restaurant in edit
  const [formData, setFormData] = useState({ 
    name: '', 
    location: '', 
    cuisine: '', 
    email: '', 
    password: '', 
    phone: '', 
    address: '',
    rating: 3,  // Added default rating value
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
    setEditMode(false); // Reset edit mode
    setFormData({ name: '', location: '', cuisine: '', email: '', password: '', phone: '', address: '', rating: 3 });
    setSelectedRestaurant(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async () => {
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
      password: '', // Don't pre-fill password
      phone: restaurant.phone || '',
      address: restaurant.address || '',
      rating: restaurant.rating || 3, 
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
    <Container>
      <Typography variant="h5" gutterBottom>Manage Restaurants</Typography>

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
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Cuisine"
            name="cuisine"
            fullWidth
            value={formData.cuisine}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <Typography gutterBottom>Restaurant Rating</Typography>
          <Slider
            value={formData.rating}
            onChange={handleSliderChange}
            aria-labelledby="rating-slider"
            valueLabelDisplay="auto"
            step={1}
            min={1}
            max={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{editMode ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageRestaurants;
