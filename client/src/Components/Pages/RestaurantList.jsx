import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Container, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)`
  margin-top: 20px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  max-width: 345px;
  margin: auto;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/restaurants")
      .then((response) => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      });
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Featured Restaurants
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {restaurants.map((restaurant) => (
            <Grid item key={restaurant._id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
              <img src={`http://localhost:5000${restaurant.image}`} alt={restaurant.name} width="50" />

                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {restaurant.cuisine} | {restaurant.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📍 {restaurant.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📞 {restaurant.phone}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </StyledContainer>
  );
};

export default RestaurantList;
