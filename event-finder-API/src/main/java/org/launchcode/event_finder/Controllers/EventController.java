package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.RSVP;
import org.launchcode.event_finder.Models.User;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.launchcode.event_finder.Repositories.RSVPRepository;
import org.launchcode.event_finder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.core.JdbcAggregateOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.launchcode.event_finder.Models.Event;
import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    private final RSVPRepository rsvpRepository;
    @Autowired
    public EventController(EventRepository eventRepository, UserRepository userRepository, RSVPRepository rsvpRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.rsvpRepository = rsvpRepository;

    }

    // Get all events
    @GetMapping
    public List<Event> getAllEvents() {

        return eventRepository.findAll( );

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

        if (eventOptional.isPresent( )) {
            return ResponseEntity.ok(eventOptional.get( ));
        } else {
            return ResponseEntity.notFound( ).build( );
        }
    }

    @PostMapping("/{eventId}/rsvp")
    public ResponseEntity<RSVP> rsvpToEvent(@PathVariable Long eventId, @RequestParam Integer userId, @RequestParam String status) {
        Optional<Event> event = eventRepository.findById(eventId);

        Optional<User> user = userRepository.findById(userId);

        if (event.isPresent() && user.isPresent()) {
            RSVP rsvp = rsvpRepository.findByUserIdAndEventId(userId, eventId)
                    .orElse(new RSVP());
            rsvp.setEvent(event.get());
            rsvp.setUser(user.get());
            rsvp.setStatus(status);
            rsvpRepository.save(rsvp);
            return ResponseEntity.ok(rsvp);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}



// /api/events/search?name=YourEventName
// /api/events
// /api/events/{eventId}




