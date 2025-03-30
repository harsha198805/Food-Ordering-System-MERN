import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetJWT = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken'); // Replace with your token retrieval logic
        
        // Set the Authorization header
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.get('http://localhost:5000/get-message-authenticate')
        .then(res => {
            if (res.data.status === 'success' && res.data.data.messages) {
                setMessages(res.data.data.messages);
            } else {
                setError('Unexpected response format from server');
            }
        })
        .catch(err => {
            if (err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                // If the error message is not in the expected format, use a generic error message
                setError('An error occurred while processing your request');
            }
        });
    }, []);

    return (
        <div>
            <h2>Retrieve from Database:</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default GetJWT;
