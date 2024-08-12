import React from 'react';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {user.username}!</p>
    </div>
  );
};

export default Dashboard;