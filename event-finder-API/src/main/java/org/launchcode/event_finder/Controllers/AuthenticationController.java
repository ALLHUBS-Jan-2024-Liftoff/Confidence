//package org.launchcode.event_finder.Controllers;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//import jakarta.validation.Valid;
//import org.launchcode.event_finder.Models.User;
//import org.launchcode.event_finder.Models.dto.LoginFormDTO;
//import org.launchcode.event_finder.Models.dto.RegisterFormDTO;
//import org.launchcode.event_finder.Repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.Errors;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//public class AuthenticationController {
//
//    @Autowired
//    UserRepository userRepository;
//
//    private static final String userSessionKey = "user";
//
//    public User getUserFromSession(HttpSession session) {
//        Integer userId = (Integer) session.getAttribute(userSessionKey);
//        if (userId == null) {
//            return null;
//        }
//
//        Optional<User> user = userRepository.findById(userId);
//
//        if (user.isEmpty()) {
//            return null;
//        }
//
//        return user.get();
//    }
//
//    private static void setUserInSession(HttpSession session, User user) {
//        session.setAttribute(userSessionKey, user.getId());
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<?> processRegistrationForm(@RequestBody @Valid RegisterFormDTO registerFormDTO,
//                                                     Errors errors, HttpServletRequest request) {
//
//        if (errors.hasErrors()) {
//            return ResponseEntity.badRequest().body(errors.getAllErrors());
//        }
//
//        User existingUser = userRepository.findByUsername(registerFormDTO.getUsername());
//
//        if (existingUser != null) {
//            return ResponseEntity.badRequest().body("A user with that username already exists");
//        }
//
//        String password = registerFormDTO.getPassword();
//        String verifyPassword = registerFormDTO.getVerifyPassword();
//        if (!password.equals(verifyPassword)) {
//            return ResponseEntity.badRequest().body("Passwords do not match");
//        }
//
//        User newUser = new User(registerFormDTO.getUsername(), registerFormDTO.getPassword());
//        userRepository.save(newUser);
//        setUserInSession(request.getSession(), newUser);
//
//        return ResponseEntity.ok("Registration successful");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO,
//                                              Errors errors, HttpServletRequest request) {
//
//        if (errors.hasErrors()) {
//            return ResponseEntity.badRequest().body(errors.getAllErrors());
//        }
//
//        User theUser = userRepository.findByUsername(loginFormDTO.getUsername());
//
//        if (theUser == null) {
//            return ResponseEntity.badRequest().body("The given username does not exist");
//        }
//
//        String password = loginFormDTO.getPassword();
//
//        if (!theUser.isMatchingPassword(password)) {
//            return ResponseEntity.badRequest().body("Invalid password");
//        }
//
//        setUserInSession(request.getSession(), theUser);
//
//        boolean isAdmin = theUser.getId() == 1; // Assuming admin user has id 1
//        Map<String, Object> response = new HashMap<>();
//        response.put("username", theUser.getUsername());
//        response.put("isAdmin", isAdmin);
//
//        return ResponseEntity.ok(response);
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        request.getSession().invalidate();
//        return ResponseEntity.ok("Logout successful");
//    }
//
//    @GetMapping("/check")
//    public ResponseEntity<?> checkAuthentication(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        User user = getUserFromSession(session);
//
//        Map<String, Object> response = new HashMap<>();
//        if (user != null) {
//            response.put("isAuthenticated", true);
//            response.put("isAdmin", user.getId() == 1); // Check if user is admin
//        } else {
//            response.put("isAuthenticated", false);
//            response.put("isAdmin", false);
//        }
//        return ResponseEntity.ok(response);
//    }
//}
