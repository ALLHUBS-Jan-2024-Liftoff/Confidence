package org.launchcode.event_finder.Controllers;
import javax.validation.Valid;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.launchcode.event_finder.Models.Event;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Date;
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
            existingEvent.setEventCityzip(event.getEventCityzip( ));
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
            // if event is not found indicates no deletion was performed.
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        //if the event exists it proceed to delete the event using eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping
    public ResponseEntity<Event> createEvent(
            @RequestParam("eventName") String eventName,
            @RequestParam("eventDate")@DateTimeFormat(pattern = "yyyy-MM-dd") Date eventDate,
            @RequestParam("eventTime") LocalTime eventTime,
            @RequestParam("eventLocation") String eventLocation,
            @RequestParam("eventCityzip") String eventCityzip,
            @RequestParam("description") String description,
            @RequestParam("eventCategory") String eventCategory,
            @RequestParam("eventPrice") double eventPrice,
            @RequestParam("approvalStatus") String approvalStatus,
            @RequestParam("eventImage") MultipartFile eventImage) {

        Event event = new Event();
        event.setEventName(eventName);
        event.setEventDate(eventDate);
        event.setEventTime(eventTime);
        event.setEventLocation(eventLocation);
        event.setEventCityzip(eventCityzip);
        event.setDescription(description);
        event.setEventCategory(eventCategory);
        event.setEventPrice(eventPrice);
        event.setApprovalStatus(approvalStatus);

        try {
            event.setEventImage(eventImage.getBytes()); // Assuming you have a byte[] field for the image
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getEventImage(@PathVariable Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            byte[] imageBytes = event.getEventImage();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust this based on your image type
                    .body(imageBytes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
