package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.DTO.WeatherDTO;
import org.launchcode.event_finder.Services.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    @Autowired
    public WeatherController(WeatherService weatherService) {

        this.weatherService = weatherService;

    }

    @GetMapping
    public WeatherDTO getWeather (@RequestParam String zipCode){

        return weatherService.getWeatherByZipCode(zipCode)

    }

}
