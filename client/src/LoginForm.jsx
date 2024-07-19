/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import App from './App';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      // Assuming 'response.data' contains any necessary login information

      // Redirect to dashboard or another route after successful login
navigateTo("/todo");
      // Optionally, you can clear form data or reset the form state here
      setFormData({
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password'); // Set error message for user feedback
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(''); // Clear any previous errors when user starts typing
  };

  return (
    <div className="container">
      <header>
        <h2>Login</h2>
      </header>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;

