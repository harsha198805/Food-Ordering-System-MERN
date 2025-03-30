import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-right: 20px;

  &.active {
    color:rgb(41, 11, 241);
    font-weight: bold;
  }

  &:hover {
    color:rgb(67, 43, 227); 
  }
`;

const StyledAppBar = styled(AppBar)`
  background-color: #ff6347 !important;
`;

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout action (clear tokens, session data, etc.)
    localStorage.removeItem('authToken'); // Example: removing the token from localStorage
    console.log('Logged out successfully');

    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledLink exact to="/" activeClassName="active"><Button color="inherit">Home</Button></StyledLink>
        <StyledLink to="/login" activeClassName="active"><Button color="inherit">Login</Button></StyledLink>
        <StyledLink to="/register" activeClassName="active"><Button color="inherit">Register</Button></StyledLink>
        <StyledLink to="/usenavigate" activeClassName="active"><Button color="inherit">UseNavigate</Button></StyledLink>
        <StyledLink to="/params/123" activeClassName="active"><Button color="inherit">Params</Button></StyledLink>
        <StyledLink to="/more-info" activeClassName="active"><Button color="inherit">More Info</Button></StyledLink>

        {/* Logout button */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navigation;
