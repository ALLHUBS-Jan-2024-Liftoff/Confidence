package org.launchcode.event_finder.Services;

import org.launchcode.event_finder.Models.DTO.WeatherDTO;
import org.launchcode.event_finder.Models.WeatherApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final RestTemplate restTemplate;

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    public WeatherService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public WeatherDTO getWeatherByZipCode(String zipCode) {
        String url = String.format("%s?zip=%s,us&cnt=1&units=imperial&appid=%s", apiUrl, zipCode, apiKey);
        WeatherApiResponse apiResponse = restTemplate.getForObject(url, WeatherApiResponse.class);
        return mapToWeatherDTO(apiResponse);
    }

    private WeatherDTO mapToWeatherDTO(WeatherApiResponse apiResponse) {
        WeatherDTO weatherDTO = new WeatherDTO();
        weatherDTO.setLocation(apiResponse.getCity().getName());
        weatherDTO.setTemp(apiResponse.getList().get(0).getMain().getTemp());
        return weatherDTO;
    }
}
