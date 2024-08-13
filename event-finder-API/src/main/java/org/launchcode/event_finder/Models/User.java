package org.launchcode.event_finder.Models;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_favorite_events",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> favoriteEvents;
    public User() {
    }




    public User(String username, String password ) {
        this.username = username;
        this.password = encoder.encode(password);

    }

    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public boolean isMatch(String password) {
        return encoder.matches(password, this.password); // Check if password matches the hashed password in the database (using BCrypt password);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Event> getFavoriteEvents() {
        return favoriteEvents;
    }

    public void setFavoriteEvents(List<Event> favoriteEvents) {
        this.favoriteEvents = favoriteEvents;
    }
}

