import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateEvent.css';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [state, setState] = useState({
    approval_status: '',
    event_name: '',
    description: '',
    event_category: '',
    event_date: '',
    event_time: '',
    event_location: '',
    event_price: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setState((prevState) => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('approvalStatus', state.approval_status);
    formData.append('eventName', state.event_name);
    formData.append('description', state.description);
    formData.append('eventCategory', state.event_category);
    formData.append('eventDate', state.event_date);
    formData.append('eventTime', state.event_time);
    formData.append('eventLocation', state.event_location);
    formData.append('eventPrice', state.event_price);
    formData.append('eventImage', state.image);

    try {
      await axios.post('http://localhost:8080/api/admin/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin'); // Navigate to '/'
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="event_name" value={state.event_name} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={state.description} onChange={handleInputChange} />
        </label>
        <label>
          Event Category:
          <input type="text" name="event_category" value={state.event_category} onChange={handleInputChange} />
        </label>
        <label>
          Event Date:
          <input type="date" name="event_date" value={state.event_date} onChange={handleInputChange} />
        </label>
        <label>
          Event Time:
          <input type="time" name="event_time" value={state.event_time} onChange={handleInputChange} />
        </label>
        <label>
          Event Location:
          <input type="text" name="event_location" value={state.event_location} onChange={handleInputChange} />
        </label>
        <label>
          Event Price:
          <input type="number" name="event_price" value={state.event_price} onChange={handleInputChange} />
        </label>
        <label>
          Approval Status:
          <select name="approval_status" value={state.approval_status} onChange={handleInputChange}>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <label>
          Event Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;