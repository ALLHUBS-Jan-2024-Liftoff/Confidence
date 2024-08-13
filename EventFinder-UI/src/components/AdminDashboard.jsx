
import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

class AdminDashboard extends Component {

  
  state = {
    events: [],
    filteredEvents: [],
    filter: 'All',
    showEditPopup: false,
    editEvent: null,
    allCount: 0,
    approvedCount: 0,
    pendingCount: 0,
    rejectedCount: 0,
    images: {}, 
    error: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/events');
      const event =response.data;
      this.setState({ events: event, filteredEvents: event });

      const approvedCountC = event.filter(event => event.approvalStatus === 'Approved').length;
      const pendingCountC = event.filter(event => event.approvalStatus === 'Pending').length;
      const rejectedCountC = event.filter(event => event.approvalStatus === 'Rejected').length;
      this.setState({allCount:event.length,approvedCount:approvedCountC,pendingCount:pendingCountC,rejectedCount:rejectedCountC});
       event.forEach(event => this.fetchImage(event.id));

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  filterEvents = (status) => {
    const { events } = this.state;
    let filteredEvents = events;
    if (status !== 'All') {
      filteredEvents = events.filter(event => event.approvalStatus === status);
    }
    this.setState({ filteredEvents, filter: status });
  };

  toggleEditPopup = (event) => {
    this.setState({ showEditPopup: !this.state.showEditPopup, editEvent: event });
  };

  handleInputChange = (e) => {
    debugger;
    const { editEvent } = this.state;
    const { name, value } = e.target;
    this.setState({ editEvent: { ...editEvent, [name]: value } });
  };

  saveChanges = async () => {
    const { editEvent } = this.state;
  
    try {
      await axios.put(`http://localhost:8080/api/admin/events/${editEvent.id}`, JSON.stringify(editEvent), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.toggleEditPopup(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating the event:', error);
    }
  };
  deleteEvent = async (eventId) => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');

    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/events/${eventId}`);
      this.fetchData(); // Refresh the event list
    } catch (error) {
      console.error('Error deleting the event:', error);
    }
  };
  
  formatTime = (timeArray) => {
    try {
        if (!Array.isArray(timeArray) || timeArray.length !== 2) {
            return '';
        }
        const [hours, minutes] = timeArray;
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } catch (error) {
        console.error('Error formatting time:', error);
        return '';
    }
  };
  fetchImage = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/events/${id}/image`, { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response.data);
      this.setState(prevState => ({
        images: { ...prevState.images, [id]: imageUrl }
      }));
    } catch (error) {
      console.error('Error fetching image', error);
    }
  };

  render() {
    const { filteredEvents, filter, showEditPopup, editEvent,allCount,approvedCount,pendingCount,rejectedCount,images } = this.state;

    return (
      
      <div className="admin-dashboard-container">
        <header className="header">
          Admin Dashboard
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
        <div className="admin-dashboard">
          <aside className="sidebar">
            <ul>
              <li className={filter === 'All' ? 'active' : ''} onClick={() => this.filterEvents('All')}>All</li>
              <li className={filter === 'Approved' ? 'active' : ''} onClick={() => this.filterEvents('Approved')}>Approved</li>
              <li className={filter === 'Pending' ? 'active' : ''} onClick={() => this.filterEvents('Pending')}>Pending</li>
              <li className={filter === 'Rejected' ? 'active' : ''} onClick={() => this.filterEvents('Rejected')}>Rejected</li>
              </ul>
          </aside>
          <main className="content">
           
            <table className="event-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  {/* <th>Description</th> */}
                  <th>Event Category</th>
                  <th>Event Date</th>
                  <th>Event Time</th>
                  <th>Event Location</th>
                  <th>Event Price</th>
                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.eventName}</td>
                    {/* <td>{event.description}</td> */}
                    <td>{event.eventCategory}</td>
                    <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td>{this.formatTime(event.eventTime)}</td>
                    <td>{event.eventLocation}</td>
                    <td>{event.eventPrice}</td>
                    <td>{event.approvalStatus}</td>
                    <td className='actions'>
                      <button className="button-edit" onClick={() => this.toggleEditPopup(event)}>View/Edit</button>
                      <button className="button-delete"onClick={() => this.deleteEvent(event.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
          </main>
        </div>
        <footer className="footer">
          Confidence
        </footer>
        {showEditPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Edit Event</h2>
              {editEvent && (
                <form>
                  {editEvent.eventImage && images[editEvent.id] ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <img
                          src={images[editEvent.id]}
                          alt={editEvent.eventName}
                          style={{ width: '300px', height: 'auto' }}
                        />
                        </div>
                      ) : 'No Image'}
                  <label>ID: {editEvent.id}</label><br />
                  <label>
                    Event Name:
                    <input type="text" name="eventName" value={editEvent.eventName} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={editEvent.description}
                      onChange={this.handleInputChange}
                      rows="5"  
                      cols="50" 
                      style={{ width: '100%' }}
                    />
                  </label><br />
                  <label>
                    Event Category:
                    <input type="text" name="eventCategory" value={editEvent.eventCategory} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Date:
                    <input
                      type="date"
                      name="eventDate"
                      value={editEvent.eventDate ? new Date(editEvent.eventDate).toISOString().slice(0, 10) : ''}
                      onChange={this.handleInputChange}
                    />
                  </label><br />
                  <label>
                    Event Time:
                    <input
                     type="time"
                     name="eventTime"
                     value={editEvent.eventTime ? editEvent.eventTime.slice(0, 5) : ''}
                     onChange={this.handleInputChange}
                    />
                  </label><br />
                  <label>
                    Event Location:
                    <input type="text" name="eventLocation" value={editEvent.eventLocation} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Price:
                    <input type="number" name="eventPrice" value={editEvent.eventPrice} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Approval Status:
                    <select name="approvalStatus" value={editEvent.approvalStatus} onChange={this.handleInputChange}>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label><br />
                  <button type="button" onClick={this.saveChanges}>Save</button>
                  <button type="button" onClick={this.toggleEditPopup}>Cancel</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
     
    );
  }
}

export default AdminDashboard;