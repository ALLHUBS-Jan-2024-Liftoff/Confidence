package org.launchcode.event_finder.Repositories;

import org.launchcode.event_finder.Models.RSVP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RSVPRepository extends JpaRepository<RSVP, Long> {
    List<RSVP> findByEventId(Long eventId);
    List<RSVP> findByUserId(Long userId);
    Optional<RSVP> findByUserIdAndEventId(Integer userId, Long eventId);
}

