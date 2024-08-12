import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const goToEvents = () => {
    navigate('/event-details');
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={goToEvents}>To Events</button>
      {/* Add more components or functionalities here as needed */}
    </div>
  );
};

export default Dashboard;