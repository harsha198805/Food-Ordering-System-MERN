import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Login page loaded");
    return () => {
      console.log("Cleanup when component is unmounted");
    };
  }, []);

  // Event Handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Both fields are required");
      return;
    }
    setError("");
    alert(`Login successful with email: ${email}`);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Heading>Login</Heading>
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
