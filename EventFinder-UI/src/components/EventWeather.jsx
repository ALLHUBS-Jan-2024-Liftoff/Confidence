import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';

const EventWeather = () => {
    const [weather, setWeather] = useState(null);
    const [zipCode, setZipCode] = useState('');

    const handleGetWeather = async () => {
        try {
            const weatherData = await getWeather(zipCode);
            setWeather(weatherData);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
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
                        <button onClick={handleGetWeather}>Get Weather</button>
                        {weather && (
                            <div>
                                <p>Location: {weather.location}</p>
                                <p>Temperature: {weather.temperature}</p>
                                <p>Condition: {weather.condition}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventWeather;
