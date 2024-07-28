import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';

const Weather = () => {
    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Event Weather</h1>
                        <script src='../indexWeather.jsx'></script>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
