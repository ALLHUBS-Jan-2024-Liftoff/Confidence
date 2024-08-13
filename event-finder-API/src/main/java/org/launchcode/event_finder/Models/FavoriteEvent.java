package org.launchcode.event_finder.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_favorite_events")
public class FavoriteEvent {

    @EmbeddedId
    private FavoriteEventId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event event;

    // getters and setters

    public FavoriteEventId getId() {
        return id;
    }

    public void setId(FavoriteEventId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}

