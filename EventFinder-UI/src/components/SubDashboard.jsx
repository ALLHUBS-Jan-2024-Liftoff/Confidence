import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const SubDashboard = () => {
  const navigate = useNavigate();
  const { user, submissions, fetchSubmissions } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        loadSubmissions();
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}/submissions`);
        const event = response.data;
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Error fetching data. Please try again later.');
      }
    };
  
  }, [user]);

      // Load user's submitted events
      const loadSubmissions = async () => {
        try {
            const submissions = await fetchSubmissions(user.id);
            const submittedEventIds = submissions.map(fav => fav.id);
            setFavoriteEvents(submittedEventIds);
        } catch (error) {
            console.error('Error fetching favorite events:', error);
            setSubmissions([]); // Ensure state is at least an empty array to prevent further errors
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
    <div className="admin-dashboard-container">
      <header className="header">Dashboard
      </header>
      <h2>Your Event Submissions</h2>
      <div className="admin-dashboard">
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/dashboard">Your Favorite Events</Link> 
            </li>
            <li>
              <Link to="/submit-event">Submit Event</Link> 
            </li>
          </ul>
        </aside>        
          {submissions.length > 0 ? (
            <main className="content">
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
                  <th>Event Zip Code</th>
                  <th>Event Price</th>
                  <th>Approval Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((event) => (
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
                    <td>{event.approvalStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </main>) : (
            <p>You have not submitted any events yet.</p>
          )}
      </div>
    </div>
  );
};

export default SubDashboard;
