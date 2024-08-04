package org.launchcode.event_finder.Services;

import org.launchcode.event_finder.Models.DTO.WeatherDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherDTO getWeatherByZipCode (String zipCode) {
        String apiUrl = "api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&cnt=25&units=imperial&units=imperial&appid=af691aedb33ac958f1003a70deb0a858";
        WeatherDTO weather = restTemplate.getForObject(apiUrl, WeatherDTO.class);
        return weather;
    }

}
