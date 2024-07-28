function fetchWeather(query) {
    var url =
    "api.openweathermap.org/data/2.5/forecast?zip=63130,us&cnt=25&units=imperial&units=imperial&appid=af691aedb33ac958f1003a70deb0a858";
    fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

fetchWeather();