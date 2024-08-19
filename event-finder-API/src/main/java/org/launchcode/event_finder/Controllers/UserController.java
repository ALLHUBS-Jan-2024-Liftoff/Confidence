package org.launchcode.event_finder.Controllers;



import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Models.FavoriteEvent;
import org.launchcode.event_finder.Models.SubmittedEvent;
import org.launchcode.event_finder.Models.RSVP;
import org.launchcode.event_finder.Models.User;
import org.launchcode.event_finder.Repositories.*;
import org.launchcode.event_finder.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jdbc.core.JdbcAggregateOperations;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private FavoriteEventRepository favoriteEventRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, EventRepository eventRepository, FavoriteEventRepository favoriteEventRepository, SubmissionRepository submissionRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.favoriteEventRepository = favoriteEventRepository;
        this.submissionRepository = submissionRepository;
        this.userService = userService;

    }

    @PostMapping("/{userId}/favorites/{eventId}")
    public ResponseEntity<?> addFavoriteEvent(@PathVariable Integer userId, @PathVariable Long eventId) {
        if (userId == null || eventId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID and Event ID must not be null");
        }

        try {
            userService.addFavoriteEvent(userId, eventId);
            return ResponseEntity.ok("Favorite added successfully");
        } catch (DataIntegrityViolationException e) {
            // This exception typically occurs when a duplicate entry is attempted
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This event is already in your favorites list.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<Event>> getFavoriteEvents(@PathVariable Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Event> favoriteEvents = favoriteEventRepository.findByUser(user)
                .stream()
                .map(FavoriteEvent::getEvent)
                .collect(Collectors.toList());

        System.out.println("Events for user " + userId + ": " + favoriteEvents);


        return ResponseEntity.ok(favoriteEvents); // Return as JSON
    }


    @PostMapping("/{userId}/submissions/{eventId}")
    public ResponseEntity<?> addSubmittedEvent(@PathVariable Integer userId, @PathVariable Long eventId) {
        if (userId == null || eventId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User ID and Event ID must not be null");
        }

        try {
            userService.addSubmittedEvent(userId, eventId);
            return ResponseEntity.ok("Submission added successfully");
        } catch (DataIntegrityViolationException e) {
            // This exception typically occurs when a duplicate entry is attempted
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This event has already been submitted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/submissions")
    public ResponseEntity<List<Event>> getSubmittedEvents(@PathVariable Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Event> submittedEvents = submissionRepository.findByUser(user)
                .stream()
                .map(SubmittedEvent::getEvent)
                .collect(Collectors.toList());

        System.out.println("Events for user " + userId + ": " + submittedEvents);


        return ResponseEntity.ok(submittedEvents); // Return as JSON
    }

    @Autowired
    private RSVPRepository rsvpRepository;

    @GetMapping("/{userId}/rsvps")
    public ResponseEntity<List<RSVP>> getUserRsvps(@PathVariable Integer userId) {
        List<RSVP> rsvps = rsvpRepository.findByUserId(userId);
        return ResponseEntity.ok(rsvps);
    }

    @DeleteMapping("/{userId}/favorites/{eventId}")
    public void removeFavoriteEvent(@PathVariable Integer userId, @PathVariable Long eventId) {
        userService.removeFavoriteEvent(userId, eventId);
    }
}
