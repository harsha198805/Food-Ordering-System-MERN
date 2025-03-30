import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ParamsPage = () => {
  const { id } = useParams();

  return (
    <Container>
      <h3>Params Page</h3>
      <p>You are viewing the details for ID: {id}</p>
    </Container>
  );
};

export default ParamsPage;
