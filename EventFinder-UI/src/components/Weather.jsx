import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';

const Weather = () => {

function getWeather() {
    var url =
    "api.openweathermap.org/data/2.5/forecast?zip=63130,us&cnt=25&units=imperial&units=imperial&appid=af691aedb33ac958f1003a70deb0a858";
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
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
