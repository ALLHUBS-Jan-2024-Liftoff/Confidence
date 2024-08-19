import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const SubDashboard = () => {
  const navigate = useNavigate();
  const { user, submissions, fetchSubmissions } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSubmissions(user.id);
    }
  }, [user]);

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
      <div className="tiles-container">
        <div className="tile all" onClick={() => this.filterEvents('All')}>
          <h3>All</h3>
          <p>{allCount}</p>
        </div>
        <div className="tile approved" onClick={() => this.filterEvents('Approved')}>
          <h3>Approved</h3>
          <p>{approvedCount}</p>
        </div>
        <div className="tile pending" onClick={() => this.filterEvents('Pending')}>
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="tile rejected" onClick={() => this.filterEvents('Rejected')}>
          <h3>Rejected</h3>
          <p>{rejectedCount}</p>
        </div>
      </div>
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
          {favorites.length > 0 ? (
            <main className="content">
            <table className="event-table">
              <thead>
                <tr>
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
                  <th>Actions</th>
                </tr>
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
                    <td>
                      <button className="button-edit" onClick={() => this.toggleEditPopup(event)}>Edit/Resubmit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </main>) : (
            <p>You have not submitted any events yet.</p>
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

export default SubDashboard;
