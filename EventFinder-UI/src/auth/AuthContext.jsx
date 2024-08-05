import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const addFavorite = async (userId, eventId) => {
    try {
        const response = await axios.post(`http://localhost:8080/favorites/add`);
        setFavorites([...favorites, response.data]);
    } catch (error) {
        console.error('Error adding favorite', error);
    }
};

const removeFavorite = async (userId, eventId) => {
  try {
      await axios.delete(`/api/auth/favorites/remove?userId=${userId}&eventId=${eventId}`);
      setFavorites(favorites.filter(fav => fav.eventId !== eventId));
  } catch (error) {
      console.error('Error removing favorite', error);
  }
};

const fetchFavorites = async (userId) => {
  try {
      const response = await axios.get(`/api/auth/favorites/${userId}`);
      setFavorites(Array.isArray(response.data) ? response.data : []);
  } catch (error) {
      console.error('Error fetching favorites', error);
  }
};



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
