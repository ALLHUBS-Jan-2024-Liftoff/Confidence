import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';
import { getWeather } from '../services/WeatherService';

const Weather = () => {
    const {zipCode} = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = (zipCode) => {

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
                        <div className="mt-4">
                            {loading ? (
                                <p>Loading...</p>
                            ) :  weatherData ? (
                                <div>
                                    <p>In {weatherData.destination}, {zipCode}</p>
                                    <p>The temperature in the next three hours is expected to be: {weatherData.temp} °F</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Currently, no weather data is available for {weatherData.destination}, {zipCode}</p>
                                    <p>Please try again later.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
