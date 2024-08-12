// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
const register = (username, password, verifyPassword) => {
    return axios.post(`${API_URL}/register`, {
        username,
        password,
        verifyPassword
    });
};


const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });
    return response.data; // This will include the isAdmin flag and other data
};
const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
        localStorage.removeItem('user'); // Clear user session in localStorage
        return true; // Successful logout
    } catch (error) {
        console.error('Logout error:', error);
        return false; // Failed logout
    }
};

export default {
    register,
    login,
    logout

};
