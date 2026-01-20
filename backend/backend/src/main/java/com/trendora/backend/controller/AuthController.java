package com.trendora.backend.controller;

import com.trendora.backend.model.User;
import com.trendora.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow React Frontend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public User login(@RequestBody User loginDetails) {
        User user = userRepository.findByUsername(loginDetails.getUsername());
        if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        user.setRole("CUSTOMER"); // Default role
        return userRepository.save(user);
    }
}
