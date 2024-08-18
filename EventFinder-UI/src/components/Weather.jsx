import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { getWeather } from '../services/WeatherService';

const Weather = () => {
    const {zipCode} = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (zipCode) {
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
        }
    }, [zipCode]);     

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Weather</h1>
                        <div className="mt-4">
                            {loading ? (
                                <p>Loading...</p>
                            ) : weatherData ? (
                                <div>
                                    <p>In {weatherData.destination}, {zipCode}</p>
                                    <p>The temperature in the next three hours is expected to be: {weatherData.temp} °F</p>
                                </div>
                            ) : (
                                <p>We're sorry--weather information is currently unavailable. Please try again later.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
