import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  gap: 1rem;
`;

const FilterInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 250px;
`;

const FilterSelect = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 250px;
`;

const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns */
  gap: 1.5rem;
`;

const FoodItem = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FoodImage = styled.img`
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const OrderButton = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #e5533a;
  }
`;

const CartContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 300px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const NoResultsMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  align-items: center;
`;

const CheckoutButton = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:hover {
    background-color: #e5533a;
  }
`;

const ItemPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/food-items");
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    if (!showCart) {
      setShowCart(true);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
    if (cart.length <= 1) {
      setShowCart(false);
    }
  };

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      categoryFilter === "" || item.category === categoryFilter;
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const navigate = useNavigate();
  const goToCheckout = () => {
    // Navigate to the Checkout page, passing the cart as state
    navigate("/checkout", { state: { cart } });
  };

  useEffect(() => {
    // Retrieve cart from localStorage on page load
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);
  
  useEffect(() => {
    // Save the cart to localStorage whenever it changes
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <HomePageContainer>
      <HomeTitle>Popular Dishes</HomeTitle>

      {/* Filters */}
      <FilterContainer>
        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
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

      {/* Cart Section */}
      {showCart && (
        <CartContainer show={showCart}>
          <h3>Cart</h3>
          {cart.length > 0 ? (
            cart.map((item) => (
              <CartItem key={item._id}>
                <span>
                  {item.name} ({item.quantity})
                </span>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </CartItem>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
          <CheckoutButton onClick={goToCheckout}>
            Proceed to Checkout
          </CheckoutButton>
        </CartContainer>
      )}
      {/* Food Items Grid */}
      <FoodGrid>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodItem key={item._id}>
              <FoodImage
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <OrderButton onClick={() => addToCart(item)}>
                Add to Cart
              </OrderButton>
            </FoodItem>
          ))
        ) : (
          <NoResultsMessage>
            No food items found matching your criteria.
          </NoResultsMessage>
        )}
      </FoodGrid>
    </HomePageContainer>
  );
};

export default ItemPage;
