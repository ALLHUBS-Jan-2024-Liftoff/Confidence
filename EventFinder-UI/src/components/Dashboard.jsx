import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, favorites, fetchFavorites, removeFavorite } = useAuth();
  const [rsvpStatuses, setRsvpStatuses] = useState({}); // State to store RSVP statuses
  const [showRsvpPopup, setShowRsvpPopup] = useState(null); // State to manage RSVP popup visibility

  useEffect(() => {
    if (user) {
      fetchFavorites(user.id);
      fetchRsvpStatuses(user.id); // Fetch RSVP statuses when the component mounts
    }
  }, [user]);

  const fetchRsvpStatuses = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/rsvps`);
      const rsvpMap = {};

      response.data.forEach(rsvp => {
        const eventId = rsvp.event.id; // Extracting the eventId from the event object
        rsvpMap[eventId] = rsvp.status;
      });

      setRsvpStatuses(rsvpMap);
    } catch (error) {
      console.error('Error fetching RSVP statuses:', error);
    }
  };

  const handleRemove = async (eventId) => {
    try {
      await removeFavorite(user.id, eventId);
      fetchFavorites(user.id);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRsvpUpdate = async (eventId, status) => {
    try {
      await axios.post(`http://localhost:8080/api/events/${eventId}/rsvp`, null, {
        params: {
          userId: user.id,
          status: status
        }
      });
      setRsvpStatuses(prevStatuses => ({ ...prevStatuses, [eventId]: status }));
      setShowRsvpPopup(null); // Close the popup after updating
    } catch (error) {
      console.error("There was an error updating the RSVP status!", error);
    }
  };

  const handleGetForecast = (zipCode) => {
    navigate(`/weather/${zipCode}`);
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
                <th>Zip Code</th>
                <th>Event Price</th>
                <th>RSVP Status</th>
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
                    <p>{rsvpStatuses[event.id] || 'No RSVP'}</p>
                  </td>
                  <td>
                    <button
                      onClick={() => setShowRsvpPopup(event.id)}
                      className="button-rsvp"
                    >
                      RSVP
                    </button>
                    <button
                      onClick={() => handleGetForecast(event.eventCityzip)}
                      className="button-weather"
                      >
                      Get Forecast
                    </button>
                    <button
                      onClick={() => handleRemove(event.id)}
                      className="button-remove"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no favorite events yet.</p>
        )}
      </div>

      {showRsvpPopup && (
        <div className="rsvp-popup">
          <div className="rsvp-popup-content">
            <h3>Change RSVP Status</h3>
            <select
              value={rsvpStatuses[showRsvpPopup] || 'none'}
              onChange={(e) => handleRsvpUpdate(showRsvpPopup, e.target.value)}
              className="form-select"
            >
              <option value="none">No RSVP</option>
              <option value="attending">Attending</option>
              <option value="not attending">Not Attending</option>
              <option value="interested">Interested</option>
            </select>
            <button
              onClick={() => setShowRsvpPopup(null)}
              className="button-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
