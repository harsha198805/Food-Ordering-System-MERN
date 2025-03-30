import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CrudGet() {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Directly call the server without a token
        axios.get('http://localhost:5000/get-message')
            .then(res => {
                // Assuming the server returns the messages directly as an array
                setMessages(res.data.data.messages);
            })
            .catch(err => {
                setError('Error fetching from server');
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
}
