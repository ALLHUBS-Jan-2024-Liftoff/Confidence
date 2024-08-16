package org.launchcode.event_finder.Models;

import java.util.List;

public class WeatherApiResponse {
    // the key value pair "temp": [degrees F] is nested under "main" under "list"
    private List<WeatherList> list;
    // the key value pair "name": "[location name associated with zip code]" is nested under "city"
    private City city;

    // Getters and setters
    public List<WeatherList> getList() {
        return list;
    }

    public void setList(List<WeatherList> list) {
        this.list = list;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public static class WeatherList {
        private Main main;
        private List<Weather> weather;

        // Getter and setter
        public Main getMain() {
            return main;
        }

        public void setMain(Main main) {
            this.main = main;
        }

        public List<Weather> getWeather() {
            return weather;
        }

        public void setWeather(List<Weather> weather) {
            this.weather = weather;
        }

        public static class Main {
            private double temp;

            // Getter and setter
            public double getTemp() {
                return temp;
            }

            public void setTemp(double temp) {
                this.temp = temp;
            }
        }
// Not using "description" yet... but likely to add this and other key/value pairs
        public static class Weather {
            private String description;

            public String getDescription() {
                return description;
            }

            public void setDescription(String description) {
                this.description = description;
            }
        }
    }

    public static class City {
        private String name;

        // Getter and setter
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
