import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';


const Dashboard = () => {
  const navigate = useNavigate();
 const { user, favorites, fetchFavorites } = useAuth();
  
 const goToEvents = () => {
    navigate('/event-details');
  };
 
  useEffect(() => {
    if (user){
    fetchFavorites(user.id);
    }
}, [user, fetchFavorites]);


  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <h2>Your Favorite Events</h2>
            <ul>
                {favorites.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
      <button onClick={goToEvents}>To Events</button>
      {/* Add more components or functionalities here as needed */}
    </div>
  );
};

export default Dashboard;