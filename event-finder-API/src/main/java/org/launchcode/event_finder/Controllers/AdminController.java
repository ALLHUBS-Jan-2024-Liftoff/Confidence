package org.launchcode.event_finder.Controllers;
import javax.validation.Valid;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.launchcode.event_finder.Models.Event;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/admin/events")
public class AdminController {

    private final EventRepository eventRepository;

    @Autowired
    public AdminController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Admin can Get all user submitted events
    @GetMapping
    public List<Event> getAllSubmittedEvents() {
        return eventRepository.findAll();
    }

    @PutMapping("{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id,
                                             @RequestBody @Valid Event event) {

        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent( )) {
            Event existingEvent = eventOptional.get( );

            //Update event fields
            existingEvent.setEventName(event.getEventName( ));
            existingEvent.setEventDate(event.getEventDate( ));
            existingEvent.setEventTime(event.getEventTime( ));
            existingEvent.setEventLocation(event.getEventLocation( ));
            existingEvent.setDescription(event.getDescription( ));
            existingEvent.setEventCategory(event.getEventCategory());
            existingEvent.setEventPrice(event.getEventPrice());
            existingEvent.setApprovalStatus(event.getApprovalStatus());

            Event updatedEvent = eventRepository.save(existingEvent);
            return ResponseEntity.ok(updatedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    //Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
