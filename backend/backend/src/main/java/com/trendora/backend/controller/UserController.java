package com.trendora.backend.controller;

import com.trendora.backend.model.User;
import com.trendora.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- 1. SIGNUP ---
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        // VALIDATION: Check password length
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set Default Role
        if (user.getRole() == null) user.setRole("USER");

        return userRepository.save(user);
    }

    // --- 2. LOGIN ---
    @PostMapping("/login")
    public User login(@RequestBody User loginDetails) {
        User user = userRepository.findByUsername(loginDetails.getUsername());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(loginDetails.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

    // --- 3. FORGOT PASSWORD ---
    @PutMapping("/forgot-password")
    public User forgotPassword(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String newPassword = payload.get("newPassword");

        // VALIDATION: Check password length
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    // --- TEMPORARY EMERGENCY SETUP ---
    // URL: http://localhost:8080/api/auth/emergency-admin
    @GetMapping("/emergency-admin")
    public String createEmergencyAdmin() {
        // 1. Delete old admin if exists
        User oldAdmin = userRepository.findByUsername("admin");
        if (oldAdmin != null) {
            userRepository.delete(oldAdmin);
        }

        // 2. Create new Admin
        User admin = new User();
        admin.setUsername("admin");
        // We let the app encrypt it, guaranteeing a match
        admin.setPassword(passwordEncoder.encode("password123"));
        admin.setRole("ADMIN");

        userRepository.save(admin);

        return "SUCCESS: Admin created! Username: 'admin', Password: 'password123'";
    }
}
