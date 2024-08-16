import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, favorites, fetchFavorites, removeFavorite } = useAuth();

  const goToEvents = () => {
    navigate('/event-details');
  };

  useEffect(() => {
    if (user) {
      fetchFavorites(user.id);
    }
    // Empty dependency array to avoid re-fetching on every render
  }, [user]);

  const handleRemove = async (eventId) => {
    try {
      await removeFavorite(user.id, eventId);  // Call the function to remove the favorite
      fetchFavorites(user.id);  // Refresh the favorites list
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };



const formatTime = (time) => {
    try {
      if (!Array.isArray(time) || time.length !== 2) {
        return '';
      }
      const [hours, minutes] = time;
      const formattedTime = new Date();
      formattedTime.setHours(hours);
      formattedTime.setMinutes(minutes);
      return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">Dashboard</header>
      <div className="dashboard-content">
        <h2>Your Favorite Events</h2>
        {favorites.length > 0 ? (
          <table className="event-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Description</th>
                <th>Event Category</th>
                <th>Event Date</th>
                <th>Event Time</th>
                <th>Event Venue</th>
                <th>City and Zip Code</th>
                <th>Event Price</th>
                <th>Actions</th>  
              </tr>
            </thead>
            <tbody>
              {favorites.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.eventName}</td>
                  <td>{event.description}</td>
                  <td>{event.eventCategory}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>{formatTime(event.eventTime)}</td>
                  <td>{event.eventLocation}</td>
                  <td>{event.eventCityzip}</td>
                  <td>{event.eventPrice}</td>
                  <td>
                    <button onClick={() => handleRemove(event.id)} className="button-remove">
                      Remove
                    </button>
                  </td>  {/* Action button to remove the favorite */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no favorite events yet.</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;