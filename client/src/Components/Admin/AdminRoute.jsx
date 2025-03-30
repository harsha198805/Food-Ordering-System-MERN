import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Example function to get the user role from localStorage or context
const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming the user data is stored in localStorage
    return user?.role;
};

const AdminRoute = () => {
    const role = getUserRole();

    // If the role is not admin, redirect to login or another page
    if (role !== 'admin') {
        return <Navigate to="/login" />;
    }

    // If the user is admin, render the component
    return <Outlet />;
};

export default AdminRoute;
