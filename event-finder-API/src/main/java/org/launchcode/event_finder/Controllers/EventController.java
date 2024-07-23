package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Arrays;
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

    // Create new event
    @PostMapping()
    public ResponseEntity<Event> createEvent(@RequestBody @Valid Event event)
    {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }


    //Update and existing event
    @PutMapping("{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id,
                                             @RequestBody @Valid Event event ,
                                             @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        //fetch event from database
        Optional<Event> eventOptional = eventRepository.findById(id);  //Retrieves the existing event entity from the database using eventRepository.findById(id)
        // Updates specific fields of the existingEvent entity with values from the event object received in the request body.
        if (eventOptional.isPresent( )) {
            Event existingEvent = eventOptional.get( );

            //Update event fields
            existingEvent.setEventName(event.getEventName( ));
            existingEvent.setEventDate(event.getEventDate( ));
            existingEvent.setEventTime(event.getEventTime( ));
            existingEvent.setEventLocation(event.getEventLocation( ));
            existingEvent.setDescription(event.getDescription( ));

            //Handle image upload if provided
            if (image != null && !image.isEmpty( )) {
                existingEvent.setEventImage(Arrays.toString(image.getBytes( )));
                existingEvent.setImageMimeType(image.getContentType( ));
            }

            //save updated event including the image
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
            // if event is not found indicates no deletion was performed.
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        //if the event exists it proceed to delete the event using eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Serve event image by id
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getEventImageById(@PathVariable Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(event.getImageMimeType()))
                    .body(event.getEventImage().getBytes( ));
        } else {
            return ResponseEntity.notFound().build();
        }
    }


// /api/events/search?name=YourEventName
// /api/events
// /api/events/{eventId}
// /api/events (POST with event JSON in the body)
// /api/events/{eventId} (PUT with updated event JSON in the body)
// /api/events/{eventId} (DELETE)

}
