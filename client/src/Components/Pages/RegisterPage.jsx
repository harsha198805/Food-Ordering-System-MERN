import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // Make sure Axios is installed
import { useNavigate } from "react-router-dom";

const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const RegistrationForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // ✅ Initialize navigate


  useEffect(() => {
    console.log("Registration page loaded");
    return () => {
      console.log("Cleanup when component is unmounted");
    };
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      // Send registration request
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "success") {
       // alert(`Registration successful with email: ${email}`);

        // Save auth token
        localStorage.setItem("authToken", response.data.token);
        
        // Retrieve redirect URL (if available), else go to home page
        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin"); // Clear stored redirect

        navigate(redirectTo);
      }
    } catch (err) {
      console.error("Error registering user:", err.response ? err.response.data : err);
      setError("Registration failed, please try again");
    }
};


  return (
    <RegistrationContainer>
      <RegistrationForm onSubmit={handleSubmit}>
        <Heading>Register</Heading>
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </RegistrationForm>
    </RegistrationContainer>
  );
};

export default RegistrationPage;
