import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ManageMenu from './Sidebar';  // Your Manage Menu component
// import Orders from './Orders';  // Your Orders component
// import Profile from './Profile';  // Your Profile component

// Sidebar and Main Layout Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #fff;
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
  }
`;

const SidebarItem = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 5px;
  margin-bottom: 0.8rem;
  background-color: ${({ isActive }) => (isActive ? '#e53e29' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : '#333')};

  &:hover {
    background-color: #e53e29;
    color: white;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: #fff;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const Header = styled.div`
  padding: 1rem;
  background-color: #e53e29;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const TabContent = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const OverviewCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

const OverviewTitle = styled.h3`
  color: #333;
`;

const OverviewValue = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #e53e29;
`;

const RestaurantDashboard = () => {
  const location = useLocation();

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <Sidebar>
        <SidebarItem
          to="/restaurant/food-items"
          isActive={location.pathname === '/restaurant/food-items'}
        >
          Manage Menu
        </SidebarItem>
        {/* <SidebarItem
          to="/restaurant/orders"
          isActive={location.pathname === '/restaurant/orders'}
        >
          Orders
        </SidebarItem>
        <SidebarItem
          to="/restaurant/profile"
          isActive={location.pathname === '/restaurant/profile'}
        >
          Profile
        </SidebarItem> */}
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        <Header>Restaurant Dashboard</Header>

        {/* Overview Section */}
        <TabContent>
          <OverviewCard>
            <OverviewTitle>Total Orders</OverviewTitle>
            <OverviewValue>350</OverviewValue>
          </OverviewCard>
          <OverviewCard>
            <OverviewTitle>Total Menu Items</OverviewTitle>
            <OverviewValue>25</OverviewValue>
          </OverviewCard>
          <OverviewCard>
            <OverviewTitle>Monthly Revenue</OverviewTitle>
            <OverviewValue>$8,000</OverviewValue>
          </OverviewCard>

          {/* Routes for individual sections */}
          <Routes>
            <Route path="/restaurant/food-items" element={<ManageMenu />} />
            {/* <Route path="/restaurant/orders" element={<Orders />} />
            <Route path="/restaurant/profile" element={<Profile />} /> */}
          </Routes>
        </TabContent>
      </MainContent>
    </DashboardContainer>
  );
};

export default RestaurantDashboard;
