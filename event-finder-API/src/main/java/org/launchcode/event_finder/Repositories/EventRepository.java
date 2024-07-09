package org.launchcode.event_finder.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.launchcode.event_finder.Models.Event;

import java.util.List;

public interface EventRepository extends JpaRepository<Event , Long> {
    List<Event> findByEventNameContainingIgnoreCase(String name);
}
