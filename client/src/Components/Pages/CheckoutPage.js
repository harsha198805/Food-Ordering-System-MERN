import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key
const stripePromise = loadStripe("pk_test_51R9KMfR4iqIkTbq0LroELdCT5oAiEyGqj0yVTb4uefrMj81ubntuQsXKzWvMUT5UdOMP8sDjiWGmu2Zs13Db49fm00S2FF5r6j");

const CheckoutContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const CartSummary = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const CartTableHeader = styled.thead`
  background-color: #f4f4f4;
  font-weight: bold;
`;

const CartTableBody = styled.tbody`
  font-size: 1rem;
`;

const CartTableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
`;

const CartTableCell = styled.td`
  padding: 1rem;
  text-align: center;
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

const CartItemQuantity = styled.input`
  width: 40px;
  margin: 0 10px;
  padding: 5px;
  text-align: center;
`;

const CheckoutButton = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 1.2rem;

  &:hover {
    background-color: #e5533a;
  }
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(location.state?.cart || []);

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("authToken");  // Example using localStorage to check if the user is logged in

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/register");  // Redirect to register page if user is not logged in
    }
  }, [isLoggedIn, navigate]);

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent setting quantity to 0 or negative
    const updatedCart = cart.map(item => 
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedCart = cart.filter(item => item._id !== itemId);
    setCart(updatedCart);
  };

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
        const customerDetails = { name: "John Doe", email: "john@example.com" };

        const response = await axios.post("http://localhost:5000/api/payments/create-checkout-session", {
            items: cart,
            totalAmount,
            customerDetails, // Include customer details
        });
      const { sessionId } = response.data;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      // After successful payment, save the order details
      if (!error) {
        // Assuming you have customer info available in your app, like name, email, etc.
        const customerDetails = { name: "John Doe", email: "john@example.com" };

        // Save the order and payment details to the database
        await axios.post('http://localhost:5000/api/payments/save-order', {
          items: cart,
          paymentDetails: {
            paymentMethod: 'Stripe',
            status: 'Success',
            transactionId: sessionId,
          },
          customerDetails: customerDetails,
          totalAmount: totalAmount,
        });

        // Redirect to a confirmation page or home
        navigate('/confirmation');
      }
    } catch (error) {
      console.error('Error during checkout:', error.response ? error.response.data : error);
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>

      <CartSummary>
        <h3>Cart Summary</h3>
        {cart.length > 0 ? (
          <>
            <CartTable>
              <CartTableHeader>
                <tr>
                  <CartTableCell>Item</CartTableCell>
                  <CartTableCell>Image</CartTableCell>
                  <CartTableCell>Quantity</CartTableCell>
                  <CartTableCell>Price</CartTableCell>
                  <CartTableCell>Actions</CartTableCell>
                </tr>
              </CartTableHeader>
              <CartTableBody>
                {cart.map((item) => (
                  <CartTableRow key={item._id}>
                    <CartTableCell>
                      <span>{item.name}</span>
                    </CartTableCell>
                    <CartTableCell>
                      <CartItemImage src={`http://localhost:5000${item.image}`} alt={item.name} />
                    </CartTableCell>
                    <CartTableCell>
                      <CartItemQuantity
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      />
                    </CartTableCell>
                    <CartTableCell>${item.price * item.quantity}</CartTableCell>
                    <CartTableCell>
                      <button onClick={() => removeItem(item._id)} style={{ color: 'red' }}>
                        Remove
                      </button>
                    </CartTableCell>
                  </CartTableRow>
                ))}
              </CartTableBody>
            </CartTable>
            <hr />
            <h3>Total: ${totalAmount}</h3>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </CartSummary>

      <CheckoutButton onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </CheckoutButton>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
