import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <ul>
        {user ? (
          <>
            <li><Link to="/protected">Protected</Link></li>
            <li><a href="#logout" onClick={logout}>Logout</a></li>
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
