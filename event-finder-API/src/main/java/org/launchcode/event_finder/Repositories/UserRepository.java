package org.launchcode.event_finder.Repositories;


import org.launchcode.event_finder.Models.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
