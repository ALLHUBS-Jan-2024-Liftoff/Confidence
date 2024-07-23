package org.launchcode.event_finder.Models;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User() {}

    public User(String username, String password) {
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


}
