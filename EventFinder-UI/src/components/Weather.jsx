import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Weather.css';

const Weather = () => {
// hardcoding 63130 for now - goal is to change location to zip on eventdetails and produce event weather on button click //
function getWeather() {
    var url =
    "api.openweathermap.org/data/2.5/forecast?zip=63130,us&cnt=25&units=imperial&units=imperial&appid=af691aedb33ac958f1003a70deb0a858";
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getWeather();

// path to a full page is not linked to anything for now (manually putting path in address bar to view) //
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

// line 22: in videos, there would be a script tag to index file where lines 5-15 would live

export default Weather;
