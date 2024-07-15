import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={goToLogin}>To Login</button>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
};

export default Home;
