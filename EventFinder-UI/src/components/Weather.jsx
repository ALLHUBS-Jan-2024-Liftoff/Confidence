import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EventDetails.css';

const Weather = () => {
    return (
        <div className='container py-5'>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h1 className='text-primary'>Weather</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;