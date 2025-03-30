import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #ff6347; /* Matching your theme's primary color */
  color: white;
  padding: 1.5rem 0;
  text-align: center;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2025 Foodie. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
