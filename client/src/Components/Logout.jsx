// components/LogoutButton.js

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');

        // Send a request to the backend to invalidate the token
        axios.post('/api/auth/logout')
            .then(response => {
                // Assuming successful logout, navigate to login page
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout failed:', error);
                // Handle error if necessary
            });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;

