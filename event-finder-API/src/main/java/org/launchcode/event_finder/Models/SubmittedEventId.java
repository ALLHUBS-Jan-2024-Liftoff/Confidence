package org.launchcode.event_finder.Models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;


@Embeddable
public class SubmittedEventId implements Serializable {

    private Integer userId;
    private Long eventId;

    // default constructor

    public SubmittedEventId() {}

    public SubmittedEventId(Integer userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }

    // getters, setters, equals, and hashCode methods

    public Integer getUserId() {
        return userId;
    }

    public Long getEventId() {
        return eventId;
    }
}

