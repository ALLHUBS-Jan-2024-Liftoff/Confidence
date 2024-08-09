import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';

const Weather = () => {

    function getWeather() {
        const zipCode = "63101"; // Hardcoding for now; replace with user input form later //
        const url = `/api/weather?zipCode=${zipCode}`; 
        fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error fetching weather data:', error));
    }

    getWeather();

    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Weather</h1>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default Weather;

// Add display code starting at line 24
