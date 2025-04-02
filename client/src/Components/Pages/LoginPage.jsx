import React, { useState } from 'react';
import axios from 'axios'; // Make sure Axios is installed
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Send the login data to the backend
          const response = await axios.post('http://localhost:5000/login', {
              email,
              password,
          });
          console.log('Login Response:', response.data); // Check the structure of the response
  
          if (response.data.status === 'success') {
              // Store the JWT token in localStorage
              localStorage.setItem('authToken', response.data.authToken);
  
              // Optionally, store the user role in localStorage for later use
              localStorage.setItem('userRole', response.data.userRole);
  
              // Redirect to dashboard or home page after successful login
              navigate('/dashboard');
          } else {
              setError(response.data.message);
          }
      } catch (err) {
          setError('Login failed. Please try again.');
          console.error('Error logging in:', err.response ? err.response.data : err);
      }
  };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
