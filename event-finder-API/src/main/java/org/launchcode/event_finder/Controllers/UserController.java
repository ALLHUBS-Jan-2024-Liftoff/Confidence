package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Models.FavoriteEvent;
import org.launchcode.event_finder.Models.User;
import org.launchcode.event_finder.Repositories.EventRepository;
import org.launchcode.event_finder.Repositories.FavoriteEventRepository;
import org.launchcode.event_finder.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private FavoriteEventRepository favoriteEventRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EventRepository eventRepository;
    @PostMapping("/favorites")
    public void addFavoriteEvent(@RequestBody FavoriteEventRequest favoriteEventRequest) {
        User user = userRepository.findById(favoriteEventRequest.getUser()).orElseThrow();
        Event event = eventRepository.findById(favoriteEventRequest.getEvent()).orElseThrow();
        FavoriteEvent favoriteEvent = new FavoriteEvent();
        favoriteEvent.setUser(user);
        favoriteEvent.setEvent(event);
        favoriteEventRepository.save(favoriteEvent);
    }

    @DeleteMapping("/favorites/{id}")
    public void removeFavoriteEvent(@PathVariable Long id) {
        favoriteEventRepository.deleteById(id);
    }

    @GetMapping("/favorites/{userId}")
    public List<FavoriteEvent> getUserFavorites(@PathVariable Long userId) {
        return favoriteEventRepository.findByUserId(userId);
    }
    static class FavoriteEventRequest {
        private Long user;
        private Long event;

        public Long getUser() {
            return user;
        }

        public void setUser(Long user) {
            this.user = user;
        }

        public Long getEvent() {
            return event;
        }

        public void setEvent(Long event) {
            this.event = event;
        }
    }
}


