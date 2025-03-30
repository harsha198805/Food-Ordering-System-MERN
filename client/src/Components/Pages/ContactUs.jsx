import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ContactUs = () => {
  return (
    <Container>
      <h3>Contact Us</h3>
      <p>If you have any questions, feel free to reach out to us at support@foodie.com.</p>
    </Container>
  );
};

export default ContactUs;
