
import styled from "styled-components";
import foodBackground from '../assets/food6.jpg';

export const HeroSectionContainer = styled.section`
  background: url(${foodBackground}) no-repeat center center/cover;
  color: white;
  padding: 6rem 0;
  text-align: center;
  background-size: cover;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const HeroButton = styled.button`
  background-color: #e53e29;
  padding: 1rem 2rem;
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #c03a1d;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;
