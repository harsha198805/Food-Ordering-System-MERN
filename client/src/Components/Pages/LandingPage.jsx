
import React from "react";
import { HeroSectionContainer, HeroContent, HeroTitle, HeroText, HeroButton } from "../../styles/landingpagestyle";
import FeaturesSection from "./FeaturesSection";
import ItemPage from "./ItemPage";

const LandingPage = () => {
  return (
    <>
      <HeroSectionContainer id="home">
        <HeroContent>
          <HeroTitle>Welcome to Foodie</HeroTitle>
          <HeroText>Order your favorite food from local restaurants and have it delivered right to your doorstep!</HeroText>
        </HeroContent>
      </HeroSectionContainer>
      <ItemPage />
      <FeaturesSection />
    </>
  );
};

export default LandingPage;
