package org.launchcode.event_finder.Models;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.antlr.v4.runtime.misc.NotNull;


import java.util.Objects;



@Entity
public class User {
    @Id
    @GeneratedValue
    private int id;
    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    public int getId() {
        return id;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }


    public String getUsername() {
        return username;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User entity = (User) o;
        return id == entity.id;

    }
    @Override
    public int hashCode () {
        return Objects.hash(id);
    }
}
