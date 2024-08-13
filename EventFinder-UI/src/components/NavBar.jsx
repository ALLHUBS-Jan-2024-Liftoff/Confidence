import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            {isAdmin() && (
              <li><Link to="/admin">Admin Dashboard</Link></li>
            )}
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a href="#logout" onClick={logout}>Logout</a></li>
            <li><Link to="/weather">Weather</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
