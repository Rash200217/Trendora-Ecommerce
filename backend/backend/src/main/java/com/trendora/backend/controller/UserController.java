package com.trendora.backend.controller;

import com.trendora.backend.model.User;
import com.trendora.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Import this
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired private UserRepository userRepository;

    // Inject the encryption tool
    @Autowired private PasswordEncoder passwordEncoder;

    // --- 1. SIGNUP (Encrypt Password) ---
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        // ENCRYPT HERE: Turn "password123" into "$2a$10$..."
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Default role if not provided
        if (user.getRole() == null) user.setRole("USER");

        return userRepository.save(user);
    }

    // --- 2. LOGIN (Compare Hash) ---
    @PostMapping("/login")
    public User login(@RequestBody User loginDetails) {
        // Find user by Username only
        User user = userRepository.findByUsername(loginDetails.getUsername());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // COMPARE HERE: Check if raw password matches the database hash
        if (!passwordEncoder.matches(loginDetails.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user; // Return user if successful
    }
}
