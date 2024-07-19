import React, { Component } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

class AdminDashboard extends Component {
  state = {
    events: [],
    filteredEvents: [],
    filter: 'All',
    showEditPopup: false,
    editEvent: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/events');
      this.setState({ events: response.data, filteredEvents: response.data });
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

  render() {
    const { filteredEvents, filter, showEditPopup, editEvent } = this.state;

    return (
      <div className="admin-dashboard-container">
        <header className="header">
          Admin Dashboard
        </header>
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
                  <th>Approval Status</th>
                  <th>Description</th>
                  <th>Event Category</th>
                  <th>Event Date</th>
                  <th>Event Image</th>
                  <th>Event Location</th>
                  <th>Event Name</th>
                  <th>Event Price</th>
                  <th>Event Time</th>
                  <th>Image MIME Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.approvalStatus}</td>
                    <td>{event.description}</td>
                    <td>{event.eventCategory}</td>
                    <td>{new Date(event.eventDate).toLocaleString()}</td>
                    <td><img src={`data:${event.image_mime_type};base64,${event.event_image}`} alt={event.event_name} /></td>
                    <td>{event.eventLocation}</td>
                    <td>{event.eventName}</td>
                    <td>{event.eventPrice}</td>
                    <td>{event.eventTime}</td>
                    <td>{event.imageMimeType}</td>
                    <td><button onClick={() => this.toggleEditPopup(event)}>Edit</button></td>
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
                  <label>ID: {editEvent.id}</label><br />
                  <label>
                    Approval Status:
                    <select name="approvalStatus" value={editEvent.approvalStatus} onChange={this.handleInputChange}>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </label><br />
                  <label>
                    Description:
                    <input type="text" name="description" value={editEvent.description} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Category:
                    <input type="text" name="eventCategory" value={editEvent.eventCategory} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Date:
                    <input type="datetime-local" name="eventDate" value={new Date(editEvent.eventDate).toLocaleDateString()} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Location:
                    <input type="text" name="eventLocation" value={editEvent.eventLocation} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Name:
                    <input type="text" name="eventName" value={editEvent.eventName} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Price:
                    <input type="number" name="eventPrice" value={editEvent.eventPrice} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Event Time:
                    <input type="time" name="eventTime" value={this.formatTime(editEvent.eventTime)} onChange={this.handleInputChange} />
                  </label><br />
                  <label>
                    Image MIME Type:
                    <input type="text" name="image_mime_type" value={editEvent.image_mime_type} onChange={this.handleInputChange} />
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
