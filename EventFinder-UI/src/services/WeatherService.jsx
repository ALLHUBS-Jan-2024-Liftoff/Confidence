import axios from 'axios';

const API_URL = 'http://localhost:8080/api/weather';

export const getWeather = async (zipCode) => {
  try {
    const response = await axios.get(API_URL, { params: { zipCode } });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
};