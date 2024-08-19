import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const SubDashboard = () => {
  const navigate = useNavigate();
  const { user, submissions, fetchSubmissions } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [allCount, setAllCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [images, setImages] = useState({});
  const [error, setError] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/${userId}/submissions');
        const event = response.data;
        setEvents(event);
        setFilteredEvents(event);
  
        const approvedCountC = event.filter(e => e.approvalStatus === 'Approved').length;
        const pendingCountC = event.filter(e => e.approvalStatus === 'Pending').length;
        const rejectedCountC = event.filter(e => e.approvalStatus === 'Rejected').length;
        
        setAllCount(event.length);
        setApprovedCount(approvedCountC);
        setPendingCount(pendingCountC);
        setRejectedCount(rejectedCountC);
        
        event.forEach(e => fetchImage(e.id));
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Error fetching data. Please try again later.');
      }
    };
  
    fetchData();
  }, []);

  const filterEvents = (status) => {
    let filtered = events;
    if (status !== 'All') {
      filtered = events.filter(e => e.approvalStatus === status);
    }
    setFilteredEvents(filtered);
    setFilter(status);
  };
  
  const toggleEditPopup = (event) => {
    setShowEditPopup(!showEditPopup);
    setEditEvent(event);
    setEditErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent(prev => ({ ...prev, [name]: value }));
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
    </div>
  );
};

export default SubDashboard;
