package org.launchcode.event_finder.Models.DTO;

public class WeatherDTO {

    public class WeatherDTO {
        private String zipLocation;
        private String zipCurrentTemp;

        // Getters and setters

        public String getZipLocation() {
            return zipLocation;
        }

        public void setZipLocation(String zipLocation) {
            this.zipLocation = zipLocation;
        }

        public String getZipCurrentTemp() {
            return zipCurrentTemp;
        }

        public void setZipCurrentTemp(String zipCurrentTemp) {
            this.zipCurrentTemp = zipCurrentTemp;
        }

    }

}
