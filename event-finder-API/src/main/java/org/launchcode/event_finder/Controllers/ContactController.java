package org.launchcode.event_finder.Controllers;

import org.launchcode.event_finder.Models.Contact;
import org.launchcode.event_finder.Repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<String> handleContactForm(@RequestBody Contact contact) {
        contactRepository.save(contact);
        return ResponseEntity.ok("Thank you for reaching out! We will get back to you soon.");
    }
    @GetMapping
    public List<Contact> getAllMessages() {
        return contactRepository.findAll();
    }
}
