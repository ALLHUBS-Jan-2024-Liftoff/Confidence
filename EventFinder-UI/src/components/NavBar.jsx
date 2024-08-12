import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">Sal LeBritti Presents!</Navbar.Brand> 
        {/* This is me being silly... Sal LeBritti = Celebrity */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Metro STL Events</Nav.Link>
            {user ? (
              <>
                {isAdmin() && (
                  <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                )}
                {!isAdmin() && (
                  <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
                )}
                <Nav.Link as={Link} to="/protected">Protected</Nav.Link>
                <Nav.Link href="#logout" onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
