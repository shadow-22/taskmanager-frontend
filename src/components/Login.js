import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    
    try {
      const response = await axios.post('/api/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (error) {
      setError('Login failed. Check your credentials.');
    }

  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default Login;