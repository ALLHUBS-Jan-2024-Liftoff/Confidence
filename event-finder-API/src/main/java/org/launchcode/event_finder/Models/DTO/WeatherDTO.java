package org.launchcode.event_finder.Models.DTO;

public class WeatherDTO {
    private String location;
    private double temp;

    // Getters and setters
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }
}
