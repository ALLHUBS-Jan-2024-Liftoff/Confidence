import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const addFavorite = async (userId, eventId) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/users/${userId}/favorites/${eventId}`);
        setFavorites([...favorites, response.data]);
    } catch (error) {
        console.error('Error adding favorite', error);
    }
  };

  const removeFavorite = async (userId, eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${userId}/favorites/${eventId}`, {
        withCredentials: true,  // Include this if needed for authentication
      });
      console.log(`Removed favorite: Event ID ${eventId}`);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };
  const fetchFavorites = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}/favorites`, {
            headers: {
                'Cache-Control': 'no-cache',  // Prevent caching
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            params: {
                t: new Date().getTime()  // Add a timestamp to prevent caching
            }
        });

        console.log('Fetched favorites:', response.data);

        // Check if the response data is an array and set it to favorites
        setFavorites(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

useEffect(() => {
  if (user && favorites.length === 0) {
    fetchFavorites(user.id);
  }
}, [user, fetchFavorites]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await fetchUser(); // Ensure the context is updated immediately
  };

  const logout = async () => {
    await axios.post('http://localhost:8080/logout');
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.id === 1; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, favorites, addFavorite, removeFavorite, fetchFavorites }}>
      {children}
    </AuthContext.Provider>
  );
};
