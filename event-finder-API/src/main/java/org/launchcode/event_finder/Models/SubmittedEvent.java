package org.launchcode.event_finder.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_submitted_events")
public class SubmittedEvent {

    @EmbeddedId
    private SubmittedEventId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    private Event event;

    // getters and setters

    public SubmittedEventId getId() {
        return id;
    }

    public void setId(SubmittedEventId id) {
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

