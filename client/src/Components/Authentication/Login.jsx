import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 0.8rem 0;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #e53e29;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  &:hover {
    background-color: #c03a1d;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            const { userRole } = response.data;
            console.log('Login successful', response.data);
            console.log('User Role:', userRole); // Debugging role

            switch (userRole) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'user':
                    navigate('/createPost');
                    break;
                default:
                    console.error('Unknown role');
                    setError('Invalid role');
            }

            setError('');
        } catch (err) {
            console.error('Login failed', err.response ? err.response.data.message : err);
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <Heading>Login</Heading>
                <Label>
                    Email:
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Label><br />
                <Label>
                    Password:
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Label><br />
                <Button type="submit">Login</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </LoginForm>
        </LoginContainer>
    );
}
