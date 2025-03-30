import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

export default function AdminDashboard() {
    const [restaurants, setRestaurants] = useState([]);
    const [open, setOpen] = useState(false); // For add/edit form dialog
    const [editMode, setEditMode] = useState(false); // Track if we're editing or adding
    const [selectedRestaurant, setSelectedRestaurant] = useState(null); // For the selected restaurant in edit
    const [formData, setFormData] = useState({ name: '', location: '', cuisine: '' });

    // Fetch restaurants when component loads
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/restaurants'); // Adjust backend URL
            setRestaurants(response.data);
        } catch (err) {
            console.error('Error fetching restaurants:', err);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false); // Reset edit mode
        setFormData({ name: '', location: '', cuisine: '' });
        setSelectedRestaurant(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                // Update existing restaurant
                await axios.put(`http://localhost:5000/restaurants/${selectedRestaurant._id}`, formData);
            } else {
                // Create new restaurant
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
        setFormData({ name: restaurant.name, location: restaurant.location, cuisine: restaurant.cuisine });
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
            <Typography variant="h4" align="center" gutterBottom>
                Manage Restaurants
            </Typography>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpen}
                sx={{ mb: 3 }}
            >
                Add Restaurant
            </Button>

            {/* Restaurant Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Cuisine</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants.map((restaurant) => (
                            <TableRow key={restaurant._id}>
                                <TableCell>{restaurant.name}</TableCell>
                                <TableCell>{restaurant.location}</TableCell>
                                <TableCell>{restaurant.cuisine}</TableCell>
                                <TableCell>
                                    <Button 
                                        color="primary" 
                                        startIcon={<Edit />} 
                                        onClick={() => handleEdit(restaurant)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        color="secondary" 
                                        startIcon={<Delete />} 
                                        onClick={() => handleDelete(restaurant._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">{editMode ? 'Update' : 'Add'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
