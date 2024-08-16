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
    event_cityzip: '',
    event_price: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setState((prevState) => ({ ...prevState, image: e.target.files[0] }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!state.event_name.trim()) newErrors.event_name = 'Event name is required.';
    if (!state.description.trim()) newErrors.description = 'Description is required.';
    if (!state.event_category.trim()) newErrors.event_category = 'Event category is required.';
    if (!state.event_date.trim()) newErrors.event_date = 'Event date is required.';
    if (!state.event_time.trim()) newErrors.event_time = 'Event time is required.';
    if (!state.event_location.trim()) newErrors.event_location = 'Event venue is required.';
    if (!state.event_cityzip.trim()) newErrors.event_cityzip = 'Event zip code is required.';
    if (!state.event_price || isNaN(state.event_price) || state.event_price <= 0) {
      newErrors.event_price = 'Event price must be a positive number.';
    }
    if (!state.approval_status.trim()) newErrors.approval_status = 'Approval status is required.';
    if (!state.image) newErrors.image = 'Event image is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('approvalStatus', state.approval_status);
    formData.append('eventName', state.event_name);
    formData.append('description', state.description);
    formData.append('eventCategory', state.event_category);
    formData.append('eventDate', state.event_date);
    formData.append('eventTime', state.event_time);
    formData.append('eventLocation', state.event_location);
    formData.append('eventCityzip', state.event_cityzip);
    formData.append('eventPrice', state.event_price);
    formData.append('eventImage', state.image);

    try {
      await axios.post('http://localhost:8080/api/admin/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin');
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
          <input
            type="text"
            name="event_name"
            value={state.event_name}
            onChange={handleInputChange}
          />
          {errors.event_name && <span className="error">{errors.event_name}</span>}
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={state.description}
            onChange={handleInputChange}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Event Category:
          <input
            type="text"
            name="event_category"
            value={state.event_category}
            onChange={handleInputChange}
          />
          {errors.event_category && <span className="error">{errors.event_category}</span>}
        </label>
        <label>
          Event Date:
          <input
            type="date"
            name="event_date"
            value={state.event_date}
            onChange={handleInputChange}
          />
          {errors.event_date && <span className="error">{errors.event_date}</span>}
        </label>
        <label>
          Event Time:
          <input
            type="time"
            name="event_time"
            value={state.event_time}
            onChange={handleInputChange}
          />
          {errors.event_time && <span className="error">{errors.event_time}</span>}
        </label>
        <label>
          Event Venue:
          <input
            type="text"
            name="event_location"
            value={state.event_location}
            onChange={handleInputChange}
          />
          {errors.event_location && <span className="error">{errors.event_location}</span>}
        </label>
        <label>
          Event City and Zip Code:
          <input 
          type="text" 
          name="event_cityzip" 
          value={state.event_cityzip} 
          onChange={handleInputChange}
          />
          {errors.event_cityzip && <span className="error">{errors.event_cityzip}</span>}
        </label>
        <label>
          Event Price:
          <input
            type="number"
            name="event_price"
            value={state.event_price}
            onChange={handleInputChange}
          />
          {errors.event_price && <span className="error">{errors.event_price}</span>}
        </label>
        <label>
          Approval Status:
          <select
            name="approval_status"
            value={state.approval_status}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          {errors.approval_status && <span className="error">{errors.approval_status}</span>}
        </label>
        <label>
          Event Image:
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <span className="error">{errors.image}</span>}
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
