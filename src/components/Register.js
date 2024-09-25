import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || password.length < 6) {
      setError('All fields are required, and password must be at least 6 characters.');
      return;
    }

    try {
      await axios.post('/api/register/', { username, email, password });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        const uniqueError = errorMessages.email ? errorMessages.email[0] : null;
        const nonFieldError = errorMessages.non_field_errors ? errorMessages.non_field_errors[0] : null;
        setError(uniqueError || nonFieldError || 'Registration failed. Try again.');
      } else {
        setError('Registration failed. Try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form-group">
      <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Handle username input
          required
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default Register;