package org.launchcode.event_finder.Models;

import jakarta.persistence.*;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalTime;
import java.util.Date;

@Entity
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Please Enter Event Name.")
    private String eventName;

    @NotNull(message = "Please Enter Event Date.")
    private Date eventDate;

    @NotNull(message = "Please Enter Event Time.")
    private LocalTime eventTime;

    @NotBlank(message = "Event location must not be empty")
    private String eventLocation;

    @NotBlank(message = "Please provide Event Description.")
    @Size(min=5, message = "Description must be at least 5 characters.")
    private String description;

    @NotBlank
    private String eventCategory;

    @NotNull
    private double eventPrice;



    // Large Object Byte for storing binary data like images in database.
    // 1 MB size limit
    // private String eventImage;   // Stores image data in byte array format.

    @Column(columnDefinition = "LONGTEXT")
    private String eventImage;
    private String imageMimeType;  // Stores MIME type of image. image/jpeg , png . gif etc.

    public Event(){}

//    public Event(String eventName, Date eventDate, LocalTime eventTime, String eventLocation, String description, String eventCategory, double eventPrice, @Size(max = 1048576) byte[] eventImage, String imageMimeType) {
//        this.eventName = eventName;
//        this.eventDate = eventDate;
//        this.eventTime = eventTime;
//        this.eventLocation = eventLocation;
//        this.description = description;
//        this.eventCategory = eventCategory;
//        this.eventPrice = eventPrice;
//        this.eventImage = eventImage;
//        this.imageMimeType = imageMimeType;
//    }

    public Long getId() {
        return id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(String eventLocation) {
        this.eventLocation = eventLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public double getEventPrice() {
        return eventPrice;
    }

    public void setEventPrice(double eventPrice) {
        this.eventPrice = eventPrice;
    }

//    public byte[] getEventImage() {
//        return eventImage;
//    }
//
//    public void setEventImage(byte[] eventImage) {
//        this.eventImage = eventImage;
//    }

    public String getEventImage() {
        return eventImage;
    }

    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }

    public String getImageMimeType() {
        return imageMimeType;
    }

    public void setImageMimeType(String imageMimeType) {
        this.imageMimeType = imageMimeType;
    }
}
