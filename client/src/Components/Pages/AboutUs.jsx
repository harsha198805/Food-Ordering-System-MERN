import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const AboutUs = () => {
  return (
    <Container>
      <h3>About Us</h3>
      <p>
        We are a food delivery service offering the best dishes from local restaurants delivered to your doorstep.
      </p>
    </Container>
  );
};

export default AboutUs;
