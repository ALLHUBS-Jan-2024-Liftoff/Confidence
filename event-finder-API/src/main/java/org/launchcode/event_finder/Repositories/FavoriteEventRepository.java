package org.launchcode.event_finder.Repositories;

import org.launchcode.event_finder.Models.FavoriteEvent;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface FavoriteEventRepository extends CrudRepository<FavoriteEvent, Long> {
    List<FavoriteEvent> findByUserId(Long userId);
    List<FavoriteEvent> findByEventId(Long eventId);
}