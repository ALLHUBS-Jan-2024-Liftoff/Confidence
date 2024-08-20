import React from 'react';
// import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // If Bootstrap's CSS is loaded after your custom styles, it can override them.

const NavBar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
          {user ? (
            <>
              {isAdmin() && (
                <li className="nav-item"><a className="nav-link" href="/admin">Admin Dashboard</a></li>
              )}
              <li className="nav-item"><a className="nav-link" href="/dashboard">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#logout" onClick={logout}>Logout</a></li>
            </>
          ) : (
            <>
              <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
              <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
