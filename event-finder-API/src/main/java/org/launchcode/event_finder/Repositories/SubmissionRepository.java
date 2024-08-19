package org.launchcode.event_finder.Repositories;

import org.launchcode.event_finder.Models.Event;
import org.launchcode.event_finder.Models.SubmittedEvent;
import org.launchcode.event_finder.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<SubmittedEvent , Long> {
    List<SubmittedEvent> findByUser(User user);

    Optional<SubmittedEvent> findByUserAndEvent(User user, Event event);


}


