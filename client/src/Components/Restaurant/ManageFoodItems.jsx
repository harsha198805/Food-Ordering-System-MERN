import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import FoodItemFormModal from './FoodItemFormModal';

const ManageFoodItems = () => {
  const [open, setOpen] = useState(false);
  const [foodItem, setFoodItem] = useState(null); // Used when editing a food item

  const fetchFoodItems = () => {
    // Fetch food items logic here
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
      >
        Add Food Item
      </Button>

      <FoodItemFormModal
        open={open}
        onClose={handleClose}
        fetchFoodItems={fetchFoodItems}
        foodItem={foodItem} // Pass the food item to edit, if applicable
      />
    </div>
  );
};

export default ManageFoodItems;
