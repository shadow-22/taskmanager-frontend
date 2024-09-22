import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Task Manager</h1>
      <p>Please choose an option:</p>
      <div>
        <Link to="/login">
          <button style={{ margin: '10px' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '10px' }}>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;