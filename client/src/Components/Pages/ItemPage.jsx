import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const HomePageContainer = styled.section`
  padding: 4rem 2rem;
  background-color: #f5f5f5;
  text-align: center;
`;

const HomeTitle = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const FilterInput = styled.input`
  padding: 0.8rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 250px;
`;

const FilterSelect = styled.select`
  padding: 0.8rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 250px;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const FoodItem = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FoodImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  max-height: 200px;
`;

const FoodName = styled.h3`
  font-size: 1.6rem;
  margin-top: 1rem;
  color: #333;
`;

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6347;
  margin: 1rem 0;
`;

const OrderButton = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e5533a;
    transform: scale(1.05);
  }
`;

const ItemPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/food-items');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    
    fetchFoodItems();
  }, []);

  const handleOrderClick = (itemName) => {
    alert(`${itemName} has been added to your order.`);
  };

  // Filter the items based on category and search term
  const filteredItems = foodItems.filter(item => {
    return (
      (categoryFilter === "" || item.category === categoryFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <HomePageContainer>
      <HomeTitle>Popular Dishes</HomeTitle>

      {/* Filters */}
      <FilterContainer>
        <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Kottu">Kottu</option>
          <option value="Hoppers">Hoppers</option>
          <option value="String Hoppers">String Hoppers</option>
          <option value="Pittu">Pittu</option>
          <option value="Roti">Roti</option>
          <option value="Seafood Dishes">Seafood Dishes</option>
          <option value="Snacks">Snacks</option>
          <option value="Sambol">Sambol</option>
          <option value="Sweets">Sweets</option>
          <option value="Beverages">Beverages</option>
          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
          <option value="Pasta">Pasta</option>
          <option value="Fried Chicken">Fried Chicken</option>
          <option value="Salads">Salads</option>
          <option value="Desserts">Desserts</option>
          <option value="Rice and Curry">Rice and Curry</option>
        </FilterSelect>

        <FilterInput
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FilterContainer>

      {/* Food Items Grid */}
      <FoodGrid>
        {filteredItems.map(item => (
          <FoodItem key={item._id}>
            {/* Display the image from the backend */}
            <FoodImage src={`http://localhost:5000${item.image}`} alt={item.name} />
            <FoodName>{item.name}</FoodName>
            <Price>${item.price}</Price>
            <OrderButton onClick={() => handleOrderClick(item.name)}>Order Now</OrderButton>
          </FoodItem>
        ))}
      </FoodGrid>
    </HomePageContainer>
  );
};

export default ItemPage;
