import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to get restaurant ID
import styled from 'styled-components';

// Styled Components (Same as in the previous example)
const FormContainer = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #e53e29;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c03a1d;
  }
`;

export default function EditRestaurant() {
    const { id } = useParams(); // Get the restaurant ID from the URL
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState({
        name: '',
        location: '',
        description: '',
        menu: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch restaurant data when editing
        axios.get(`http://localhost:5000/restaurants/${id}`)
            .then((response) => {
                setRestaurant(response.data);
            })
            .catch((err) => {
                setError('Failed to fetch restaurant details');
                console.error(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({
            ...restaurant,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/restaurants/update/${id}`, restaurant);
            navigate('/admin/dashboard'); // Redirect to the dashboard
        } catch (err) {
            setError('Failed to update restaurant');
            console.error(err);
        }
    };

    return (
        <FormContainer>
            <h2>Edit Restaurant</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <Input
                    type="text"
                    name="name"
                    value={restaurant.name}
                    onChange={handleChange}
                    required
                />
                <label>Location:</label>
                <Input
                    type="text"
                    name="location"
                    value={restaurant.location}
                    onChange={handleChange}
                    required
                />
                <label>Description:</label>
                <Input
                    type="text"
                    name="description"
                    value={restaurant.description}
                    onChange={handleChange}
                />
                <label>Menu:</label>
                <Input
                    type="text"
                    name="menu"
                    value={restaurant.menu}
                    onChange={handleChange}
                />
                <label>Email:</label>
                <Input
                    type="email"
                    name="email"
                    value={restaurant.email}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <Input
                    type="password"
                    name="password"
                    value={restaurant.password}
                    onChange={handleChange}
                    required
                />
                <label>Phone:</label>
                <Input
                    type="tel"
                    name="phone"
                    value={restaurant.phone}
                    onChange={handleChange}
                    required
                />
                <label>Address:</label>
                <Input
                    type="text"
                    name="address"
                    value={restaurant.address}
                    onChange={handleChange}
                />
                <Button type="submit">Update Restaurant</Button>
            </form>
        </FormContainer>
    );
}
