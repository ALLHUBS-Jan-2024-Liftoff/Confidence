package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.DTO.LoginFormDTO;
import org.launchcode.event_finder.Models.DTO.RegistrationFormDTO;
import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Models.FavoriteEvent;
import org.launchcode.event_finder.Models.SubmittedEvent;
import org.launchcode.event_finder.Models.User;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.launchcode.event_finder.Repositories.FavoriteEventRepository;
import org.launchcode.event_finder.Repositories.SubmissionRepository;
import org.launchcode.event_finder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AuthController {
    private final UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private FavoriteEventRepository favoriteEventRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    public AuthController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUserFromSession(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegistrationFormDTO registrationForm) {
        // Check if passwords match
        if (!registrationForm.getPassword().equals(registrationForm.getVerifyPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Passwords do not match");
        }

        // Check if username already exists
        if (userRepository.findByUsername(registrationForm.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(registrationForm.getUsername());
        user.setPassword(passwordEncoder.encode(registrationForm.getPassword()));

        // Save user to database
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@Valid @RequestBody LoginFormDTO loginForm, HttpSession session) {
        // Find user by username
        User user = userRepository.findByUsername(loginForm.getUsername());

        // Check if user exists and password matches
        if (user != null && passwordEncoder.matches(loginForm.getPassword(), user.getPassword())) {
            // Set user in session
            session.setAttribute("user", user);

            // Check if user is admin
            if (user.getId() == 1) { // Assuming admin ID is 1
                return ResponseEntity.ok("Admin login successful");
            } else {
                return ResponseEntity.ok("User login successful");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate(); // Invalidate session
        return ResponseEntity.ok("Logged out successfully");
    }



    @DeleteMapping("/favorites/remove")
    public void removeFavoriteEvent(@RequestParam Integer userId, @RequestParam Long eventId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        FavoriteEvent favoriteEvent = favoriteEventRepository.findByUserAndEvent(user, event)
                .orElseThrow(() -> new RuntimeException("Favorite event not found"));
        favoriteEventRepository.delete(favoriteEvent);
    }


}



//User Endpoint (GET):
//
//URL: http://localhost:8080/auth/user
//Method: GET
//Register Endpoint (POST):
//
//URL: http://localhost:8080/auth/register
//Method: POST
//Login Endpoint (POST):
//
//URL: http://localhost:8080/auth/login
//Method: POST