import React from 'react';
import { useAuth } from '../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
      <a className="navbar-brand" href="#">Navbar w/ text</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active"><a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a></li>
          {user ? (
            <>
              {isAdmin() && (
                <li className="nav-item"><a className="nav-link" href="/admin">Admin Dashboard</a></li>
              )}
              <li className="nav-item"><a className="nav-link" href="/dashboard">Dashboard</a></li>
              <li className="nav-item"><a href="#logout" onClick={logout}>Logout</a></li>
            </>
          ) : (
            <>
              <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
              <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
            </>
          )}
        </ul>
        <span className="navbar-text">
          Placeholder: login status goes here
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
