import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      
      <h1>Welcome to Task Manager</h1>
      <p>Please choose an option:</p>
      
      <div className="mt-4">
        <Link to="/login">
          <button className="btn btn-primary me-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary">Register</button>
        </Link>
      </div>

      <div className="mt-5">
        <h3>Features:</h3>
        <ul className="list-unstyled">
          <li>✔ Simple user interface for task management</li>
          <li>✔ Add, edit, and delete tasks easily</li>
          <li>✔ Mark tasks as completed</li>
          <li>✔ Secure login and registration</li>
        </ul>
      </div>

      <footer className="mt-5">
        <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Home;