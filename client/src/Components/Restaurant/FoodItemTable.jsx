import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FoodItemForm from './FoodItemForm';

const FoodItemTable = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchFoodItems = async () => {
    const { data } = await axios.get('http://localhost:5000/food-items');
    setFoodItems(data);
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/food-items/${id}`);
    fetchFoodItems();
  };

  const handleAddNew = () => {
    setEditItem(null); // Clear the form to allow creating a new item
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <div>
      {/* Add button for creating a new food item */}
      <Button variant="contained" color="primary" onClick={handleAddNew} style={{ marginBottom: '20px' }}>
        Add New Food Item
      </Button>

      {/* Modal for adding/editing food item */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editItem ? 'Edit Food Item' : 'Add New Food Item'}</DialogTitle>
        <DialogContent>
          {/* Pass handleClose to FoodItemForm so it can close the modal */}
          <FoodItemForm fetchFoodItems={fetchFoodItems} foodItem={editItem} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: '20px',marginLeft: '10%',marginRight:'10%', width: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>${item.discountPrice}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <img src={`http://localhost:5000${item.image}`} alt={item.name} width="50" />
                </TableCell>
                <TableCell>
                  {/* Set the selected item to editItem when Edit is clicked */}
                  <Button onClick={() => { setEditItem(item); setOpen(true); }}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FoodItemTable;
