import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { getWeather } from '../services/WeatherService';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [zipCode, setZipCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGetWeather = () => {
        if (zipCode.trim() === '') {
            console.error('Please enter a valid zip code.');
            return;
        }
        setLoading(true);
        getWeather(zipCode)
            .then((data) => {
                setWeatherData(data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            });
    };

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Weather</h1>
                        <input 
                            type="text" 
                            placeholder="Enter zip code" 
                            value={zipCode} 
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        <button onClick={handleGetWeather} className="btn btn-primary mt-2">Get Weather</button>
                        <div className="mt-4">
                            {loading ? (
                                <p>Loading...</p>
                            ) : weatherData ? (
                                <div>
                                    <p>In {weatherData.location}</p>
                                    <p>The temperature in the next three hours is expected to be: {weatherData.temp} °F</p>
                                </div>
                            ) : (
                                <p>Please enter a zip code to get the weather information.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
