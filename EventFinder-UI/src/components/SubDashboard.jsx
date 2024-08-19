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
  
  const validateEditForm = () => {
    const errors = {};
  
    if (!editEvent.eventName || editEvent.eventName.trim() === '') {
      errors.eventName = 'Event name is required.';
    }
    if (!editEvent.description || editEvent.description.trim() === '') {
      errors.description = 'Description is required.';
    }
    if (!editEvent.eventCategory || editEvent.eventCategory.trim() === '') {
      errors.eventCategory = 'Event category is required.';
    }
    if (!editEvent.eventDate) {
      errors.eventDate = 'Event date is required.';
    }
    if (!editEvent.eventTime) {
      errors.eventTime = 'Event time is required.';
    }
    if (!editEvent.eventLocation || editEvent.eventLocation.trim() === '') {
      errors.eventLocation = 'Event venue name is required.';
    }
    if (!editEvent.eventCityzip || editEvent.eventCityzip.trim() === '') {
      errors.eventCityzip = 'Event zip code is required.';
    } else if (!isValidZipCode(editEvent.eventCityzip)) {
      errors.eventCityzip = 'Please enter a valid zip code from the St. Louis metro area.';
    }
    if (!editEvent.eventPrice || isNaN(editEvent.eventPrice) || editEvent.eventPrice <= 0) {
      errors.eventPrice = 'Event price must be a positive number.';
    }
    if (!editEvent.approvalStatus || editEvent.approvalStatus.trim() === '') {
      errors.approvalStatus = 'Approval status is required.';
    }
  
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const saveChanges = async () => {
    if (!validateEditForm()) {
      return;
    }

    try {
        await axios.put(`http://localhost:8080/api/users/${userId}/submissions/${editEvent.id}`, JSON.stringify(editEvent), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toggleEditPopup(null);
        fetchData();
      } catch (error) {
        console.error('Error updating the event:', error);
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

  const fetchImage = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/submissions/${id}/image`, { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      setImages(prevImages => ({ ...prevImages, [id]: imageUrl }));
    } catch (error) {
      console.error('Error fetching image', error);
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
            <li className={filter === 'All' ? 'active' : ''} onClick={() => this.filterEvents('All')}>All</li>
            <li className={filter === 'Approved' ? 'active' : ''} onClick={() => this.filterEvents('Approved')}>Approved</li>
            <li className={filter === 'Pending' ? 'active' : ''} onClick={() => this.filterEvents('Pending')}>Pending</li>
            <li className={filter === 'Rejected' ? 'active' : ''} onClick={() => this.filterEvents('Rejected')}>Rejected</li>
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
