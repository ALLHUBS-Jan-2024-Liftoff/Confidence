package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.Contact;
import org.launchcode.event_finder.Repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public ResponseEntity<String> handleContactForm(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return ResponseEntity.ok("Thank you for reaching out! We will get back to you soon.");
    }
}
