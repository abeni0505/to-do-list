/* eslint-disable no-unused-vars */
// SignUpForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import App from './App';

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Correct usage of useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("test error",formData.name);
      const response = await axios.post('http://localhost:3001/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('Signup successful:', response.data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, show user an error message or retry logic
    }

    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <header>
        <h2>Register</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUpForm;
