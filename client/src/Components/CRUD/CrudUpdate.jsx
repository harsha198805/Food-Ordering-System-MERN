import React, { useState } from 'react';
import axios from 'axios';

const CrudUpdate = () => {
    const [id, setId] = useState(''); // Initialize with an empty string
    const [newMessage, setMessage] = useState('');
    const [response, setResponse] = useState('');


    const updateServerMessage = () => {
        if (id && newMessage) {
            axios.put(`http://localhost:5000/update-message/${id}`, { message: newMessage }) // Changed 'newMessage' key to 'message'
                .then(() => {
                    setResponse('Message Updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating on server:', error.response ? error.response.data.message : error.message);
                });
        } else {
            console.warn('Please provide both ID and message.');
        }
    };
    
    return (
        <div>
            <h2>Update The Database</h2>
            
            <input 
                type="text"
                placeholder="Enter ID"
                value={id}
                onChange={e => setId(e.target.value)}
            />

            <input 
                type="text" 
                placeholder="Enter message"
                value={newMessage}
                onChange={e => setMessage(e.target.value)}
            />

            <button onClick={updateServerMessage}>Update</button>
            <div>{response}</div>
        </div>
    );
};

export default CrudUpdate;
