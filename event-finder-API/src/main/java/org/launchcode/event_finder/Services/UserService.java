package org.launchcode.event_finder.Services;

import jakarta.transaction.Transactional;
import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Models.User;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.launchcode.event_finder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Transactional
    public void createAdminIfNotExists() {
        if (!userRepository.existsById(1)) {
            User admin = new User();
            admin.setId(1);
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("adminPassword"));

            userRepository.save(admin);
            System.out.println("Admin user created successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }

    public void addFavoriteEvent(Integer userId, Long eventId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Event> eventOpt = eventRepository.findById(eventId);

        if (userOpt.isPresent() && eventOpt.isPresent()) {
            User user = userOpt.get();
            Event event = eventOpt.get();
            user.getFavoriteEvents().add(event);
            userRepository.save(user);
        }
    }

    public void removeFavoriteEvent(Integer userId, Long eventId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Event> eventOpt = eventRepository.findById(eventId);

        if (userOpt.isPresent() && eventOpt.isPresent()) {
            User user = userOpt.get();
            Event event = eventOpt.get();
            user.getFavoriteEvents().remove(event);
            userRepository.save(user);
        }
    }
}