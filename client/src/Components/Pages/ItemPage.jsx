import React from "react";
import styled from "styled-components";
import food1 from '../../assets/food1.jpg';
import food2 from '../../assets/food2.jpg';
import food3 from '../../assets/food3.jpg';
import food4 from '../../assets/food4.jpg';
import food5 from '../../assets/food5.jpg';
import food6 from '../../assets/food6.jpg';
import food7 from '../../assets/food7.jpg';
import food8 from '../../assets/food8.jpg';

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
  const handleOrderClick = (itemName) => {
    alert(`${itemName} has been added to your order.`);
  };

  return (
    <HomePageContainer>
      <HomeTitle>Popular Dishes</HomeTitle>
      <FoodGrid>
        <FoodItem>
          <FoodImage src={food1} alt="Gourmet Burger" />
          <FoodName>Gourmet Burger</FoodName>
          <Price>$12.99</Price>
          <OrderButton onClick={() => handleOrderClick("Gourmet Burger")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food2} alt="Fresh Salad" />
          <FoodName>Fresh Salad</FoodName>
          <Price>$8.99</Price>
          <OrderButton onClick={() => handleOrderClick("Fresh Salad")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food3} alt="Pizza Margherita" />
          <FoodName>Pizza Margherita</FoodName>
          <Price>$14.99</Price>
          <OrderButton onClick={() => handleOrderClick("Pizza Margherita")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food4} alt="Sushi Platter" />
          <FoodName>Sushi Platter</FoodName>
          <Price>$22.99</Price>
          <OrderButton onClick={() => handleOrderClick("Sushi Platter")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food5} alt="Pasta Bolognese" />
          <FoodName>Pasta Bolognese</FoodName>
          <Price>$13.49</Price>
          <OrderButton onClick={() => handleOrderClick("Pasta Bolognese")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food6} alt="Ice Cream Sundae" />
          <FoodName>Ice Cream Sundae</FoodName>
          <Price>$6.99</Price>
          <OrderButton onClick={() => handleOrderClick("Ice Cream Sundae")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food7} alt="Veggie Burger" />
          <FoodName>Veggie Burger</FoodName>
          <Price>$11.99</Price>
          <OrderButton onClick={() => handleOrderClick("Veggie Burger")}>Order Now</OrderButton>
        </FoodItem>
        <FoodItem>
          <FoodImage src={food8} alt="Grilled Chicken" />
          <FoodName>Grilled Chicken</FoodName>
          <Price>$15.99</Price>
          <OrderButton onClick={() => handleOrderClick("Grilled Chicken")}>Order Now</OrderButton>
        </FoodItem>
      </FoodGrid>
    </HomePageContainer>
  );
};

export default ItemPage;
