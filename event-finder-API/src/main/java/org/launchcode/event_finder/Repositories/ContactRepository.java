package org.launchcode.event_finder.Repositories;

import org.launchcode.event_finder.Models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
