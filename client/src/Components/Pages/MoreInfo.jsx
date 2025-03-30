import { Link, Routes, Route } from 'react-router-dom';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import styled from 'styled-components';

const Page = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const PageTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const StyledLink = styled(Link)`
  font-size: 1.25rem;
  color: #ff6347;
  text-decoration: none;
  padding-bottom: 5px;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid #ff6347;
  }

  &.active {
    font-weight: bold;
    border-bottom: 2px solid #ff6347;
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

function MoreInfo() {
  return (
    <Page>
      <PageTitle>More Info</PageTitle>
      <nav>
        <NavList>
          <NavItem><StyledLink to="about-us">About Us</StyledLink></NavItem>
          <NavItem><StyledLink to="contact-us">Contact Us</StyledLink></NavItem>
        </NavList>
      </nav>

      <ContentArea>
        <Routes>
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Routes>
      </ContentArea>
    </Page>
  );
}

export default MoreInfo;
