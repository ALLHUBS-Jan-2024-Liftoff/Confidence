package org.launchcode.event_finder.Controllers;


import org.launchcode.event_finder.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.launchcode.event_finder.Models.Event;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;

    @Autowired
    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }


    // Search events by name containing case-insensitive
    @GetMapping("/search")
    public List<Event> searchEventsByName(@RequestParam(name = "name") String name) {
        return eventRepository.findByEventNameContainingIgnoreCase(name);
    }

    //Get event by id
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            return ResponseEntity.ok(eventOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update approval status of an event
//    @PutMapping("/{id}/approve")
//    public ResponseEntity<Event> approveEvent(@PathVariable Long id) {
//        Optional<Event> eventOptional = eventRepository.findById(id);
//        if (eventOptional.isPresent()) {
//            Event event = eventOptional.get();
//            event.setApproved(true); // Set event as approved
//            Event updatedEvent = eventRepository.save(event); // Save updated event
//            return ResponseEntity.ok(updatedEvent);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


// /api/events/search?name=YourEventName
// /api/events
// /api/events/{eventId}

}