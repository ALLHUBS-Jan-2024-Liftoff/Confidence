// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import { useAuth } from '../auth/AuthContext';
// import '../styles/LoginForm.css'; // Import CSS file for styling

// axios.defaults.withCredentials = true;

// const LoginForm = () => {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/login', form);
//       setMessage('Login successful');
//       login(response.data); // Update with actual user data

//       // Navigate to 'eventDetails' page after successful login
//       navigate('/eventDetails');
//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data);
//       } else {
//         setMessage('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="login-form-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Login</button>
//       </form>
//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../auth/AuthContext';
import '../styles/LoginForm.css'; // Import CSS file for styling

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', form);
      setMessage('Login successful');
      login(response.data); // Update with actual user data

      // Navigate to 'eventDetails' page after successful login
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginForm;
