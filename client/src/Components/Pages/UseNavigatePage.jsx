import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components for layout
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #e53e29;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c03a1d;
  }
`;

const UseNavigatePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/more-info");
  };

  return (
    <Container>
      <Title>UseNavigate Page</Title>
      <p>Click the button to navigate to the "More Info" page.</p>
      <Button onClick={handleNavigate}>Go to More Info</Button>
    </Container>
  );
};

export default UseNavigatePage;
