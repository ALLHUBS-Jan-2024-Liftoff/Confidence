package org.launchcode.event_finder.Models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;


@Embeddable
public class FavoriteEventId implements Serializable {

    private Integer userId;
    private Long eventId;

    // default constructor

    public FavoriteEventId() {}

    public FavoriteEventId(Integer userId, Long eventId) {
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

