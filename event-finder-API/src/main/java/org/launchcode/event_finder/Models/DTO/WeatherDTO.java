package org.launchcode.event_finder.Models.DTO;

public class WeatherDTO {
    private String destination;
    private double temp;

    // Getters and setters
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }
}
