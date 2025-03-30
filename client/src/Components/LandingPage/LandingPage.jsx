
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Fetch featured restaurants and popular dishes from backend
    axios.get('/api/restaurants/featured').then(response => setRestaurants(response.data));
    axios.get('/api/dishes/popular').then(response => setDishes(response.data));
  }, []);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Welcome to Foodie</Typography>

      {/* Featured Restaurants Section */}
      <Typography variant="h4" gutterBottom>Featured Restaurants</Typography>
      <Grid container spacing={2}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2">{restaurant.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Popular Dishes Section */}
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>Popular Dishes</Typography>
      <Grid container spacing={2}>
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dish.name}</Typography>
                <Typography variant="body2">{dish.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sign up / Login Buttons */}
      <Grid container spacing={2} style={{ marginTop: '30px' }}>
        <Grid item>
          <Button variant="contained" color="primary" href="/register">
            Restaurant Register
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" href="/login">
            Customer Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
