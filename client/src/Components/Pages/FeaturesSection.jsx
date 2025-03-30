import React from "react";
import styled from "styled-components";

const FeaturesSectionContainer = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  width: 30%;
  padding: 1rem;
  margin: 1rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const FeaturesSection = () => {
  return (
    <FeaturesSectionContainer id="menu">
      <FeaturesTitle>Why Choose Foodie?</FeaturesTitle>
      <FeaturesList>
        <FeatureItem>
          <FeatureTitle>Fast Delivery</FeatureTitle>
          <FeatureText>Get your food delivered within 30 minutes.</FeatureText>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Wide Selection</FeatureTitle>
          <FeatureText>Choose from a variety of restaurants and cuisines.</FeatureText>
        </FeatureItem>
        <FeatureItem>
          <FeatureTitle>Secure Payment</FeatureTitle>
          <FeatureText>Easy and secure online payment options.</FeatureText>
        </FeatureItem>
      </FeaturesList>
    </FeaturesSectionContainer>
  );
};

export default FeaturesSection;
