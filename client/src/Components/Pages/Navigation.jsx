import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-right: 20px;

  &.active {
    color: rgb(41, 11, 241);
    font-weight: bold;
  }

  &:hover {
    color: rgb(67, 43, 227);
  }
`;

const StyledAppBar = styled(AppBar)`
  background-color: #ff6347 !important;
`;

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("cart");
    console.log("Logged out successfully");

    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole"); // Retrieve user role

  const isAdmin = userRole === "admin";
  const isRestaurantOwner = userRole === "restaurant_owner";

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledLink exact to="/" activeClassName="active">
          <Button color="inherit">Home</Button>
        </StyledLink>
        <StyledLink to="/restaurants" activeClassName="active">
          <Button color="inherit">Restaurants</Button>
        </StyledLink>
        <StyledLink to="/cart" activeClassName="active">
          <Button color="inherit">Cart</Button>
        </StyledLink>
        {isLoggedIn && (
          <>
            <StyledLink to="/orders" activeClassName="active">
              <Button color="inherit">Orders</Button>
            </StyledLink>
            <StyledLink to="/profile" activeClassName="active">
              <Button color="inherit">Profile</Button>
            </StyledLink>
            {isAdmin && (
              <StyledLink to="/admin" activeClassName="active">
                <Button color="inherit">Admin</Button>
              </StyledLink>
            )}
            {isRestaurantOwner && (
              <StyledLink to="/owner-dashboard" activeClassName="active">
                <Button color="inherit">Owner Dashboard</Button>
              </StyledLink>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
        {!isLoggedIn && (
          <>
            <StyledLink to="/login" activeClassName="active">
              <Button color="inherit">Login</Button>
            </StyledLink>
            <StyledLink to="/register" activeClassName="active">
              <Button color="inherit">Register</Button>
            </StyledLink>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navigation;
