import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Please fill in both fields.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        alert(response.data.message);
        setError('');
        navigate('/home');
    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        console.error('Login request error:', err); // Log the error for debugging
    }
};
const handleAddUser = async () => {
  const userData = {
      email: 'user@example.com',
      password: 'your_password',
      name: 'John Doe',          // Ensure these fields are filled in
      address: '123 Main St',    // Ensure these fields are filled in
      contact: 'john@example.com' // Ensure these fields are filled in
  };

  try {
      const response = await axios.post('http://localhost:5000/api/add-user', userData);
      console.log('User added successfully:', response.data);
  } catch (error) {
      console.error('Error adding user:', error.response?.data);
  }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
