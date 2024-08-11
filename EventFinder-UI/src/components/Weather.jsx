import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { getWeather } from '../services/WeatherService';

// Update: Use a service file and use axios, not fetch

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const zipCode = "63101"; // Hardcoding for now; replace with user input form later //
        getWeather(zipCode)
            .then((data) => setWeatherData(data))
            .catch((error) => console.error('Error fetching weather data:', error));
    }, []);

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Weather</h1>
                        {weatherData ? (
                            <div>
                                <p>In {weatherData.location}</p>
                                <p>The temperature in the next three hours is expected to be: {weatherData.temp} °F</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Weather;
