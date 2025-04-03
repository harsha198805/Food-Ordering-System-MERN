import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, Grid, TextField, CircularProgress } from "@mui/material";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants") // Update with your backend API URL
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Browse Restaurants
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Restaurants"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item key={restaurant._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurant.image || "https://via.placeholder.com/150"}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {restaurant.location}
                  </Typography>
                  <Typography variant="body2">⭐ {restaurant.rating} / 5</Typography>
                  <Button
                    component={Link}
                    to={`/menu/${restaurant._id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "10px" }}
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Restaurants;
