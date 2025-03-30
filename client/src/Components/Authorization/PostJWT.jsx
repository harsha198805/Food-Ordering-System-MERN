import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Logout';

const PostJWT = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const sendToServer = () => {
        const token = localStorage.getItem('jwtToken');

        // Set the Authorization header
        axios.defaults.headers.common['Authentication'] = 'Bearer ' + token;

        axios.post('http://localhost:5000/post-message-authenticate', { message })
            .then(response => {
                setMessage(''); // Clearing the input field
                navigate('/getSpecificUserMsg');
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    };

    return (
        <div>
            <h2>Post to Database</h2>
            <input 
                type="text" 
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={sendToServer}>Send</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <LogoutButton/>
        </div>
    );
};

export default PostJWT;