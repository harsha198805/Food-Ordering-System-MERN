import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // Check for user role or token in localStorage (or cookies)
  const isAdmin = localStorage.getItem('userRole') === 'admin';  // Example condition

  // If not an admin, redirect to the login page
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // If the user is an admin, render the nested routes (AdminDashboard, etc.)
  return <Outlet />;
};

export default AdminRoute;
