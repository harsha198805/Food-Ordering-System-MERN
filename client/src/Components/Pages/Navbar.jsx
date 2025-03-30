import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ff6347;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavLink = styled.li`
  margin-left: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background-color: #e53e29;
  color: white;
  padding: 0.8rem 1.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-right: 50px;
  &:hover {
    background-color: #c03a1d;
  }
`;

const LogoutButton = styled.button`
  background-color: #444;
  color: white;
  padding: 0.8rem 1.6rem;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-left: 2rem;
  &:hover {
    background-color: #333;
  }
`;

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear session storage, local storage, or cookies if necessary
    // Example: localStorage.removeItem('authToken');
    console.log('Logged out');
    
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <Logo>Foodie</Logo>
      <NavLinks>
        <NavLink>
          <Link href="#home">Home</Link>
        </NavLink>
        <NavLink>
          <Link href="#menu">Menu</Link>
        </NavLink>
        <NavLink>
          <Link href="#about">About</Link>
        </NavLink>
        <NavLink>
          <Link href="#contact">Contact</Link>
        </NavLink>
        <NavLink>
          <Button>Order Now</Button>
        </NavLink>
        {/* Add the logout button */}
        <NavLink>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
