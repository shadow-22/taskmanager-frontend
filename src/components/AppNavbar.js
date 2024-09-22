import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
  
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* Navbar Brand */}
          <Navbar.Brand as={Link} to="/">Task Manager</Navbar.Brand>
  
          {/* Toggle Button for Mobile View */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
  
          {/* Navbar Links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Home Link */}
              <Nav.Link as={Link} to="/">Home</Nav.Link>
  
              {/* Tasks Link (only visible when logged in) */}
              {localStorage.getItem('token') && <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>}
            </Nav>
  
            {/* Right Aligned Links for Login/Logout */}
            <Nav className="ms-auto">
              {/* Show "Login" link if not logged in */}
              {!localStorage.getItem('token') ? (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              ) : (
                <>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

export default AppNavbar;