import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';


const Dashboard = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const goToEvents = () => {
    navigate('/event-details');

    
  };useEffect(() => {
    const fetchFavorites = async () => {
        if (user) {
            try {
                const response = await axios.get(`/user/favorites/${user.id}`);
                setFavorites(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching favorite events:", error);
                setFavorites([]);
            }
        }
    };

    fetchFavorites();
}, [user]);

  
return (
  <div className="dashboard">
      <h1>User Dashboard</h1>
      <div className="favorites">
          {favorites.length > 0 ? (
              favorites.map(favorite => (
                  <div key={favorite.id} className="card">
                      <h2>{favorite.event.name}</h2>
                      <p>{favorite.event.description}</p>
                  </div>
              ))
          ) : (
              <p>No favorite events to display.</p>
          )}
      </div>
  </div>
);
};

export default Dashboard;