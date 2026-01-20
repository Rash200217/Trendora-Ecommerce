package com.trendora.backend.controller;

import com.trendora.backend.model.User;
import com.trendora.backend.repository.OrderRepository;
import com.trendora.backend.repository.ProductRepository;
import com.trendora.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- 1. DASHBOARD STATS ---
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("productCount", productRepository.count());
        stats.put("userCount", userRepository.count());

        Double totalSales = orderRepository.getTotalSales();
        stats.put("totalSales", totalSales != null ? totalSales : 0.0);

        return stats;
    }

    // --- 2. USER MANAGEMENT ---
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // RESET USER PASSWORD (Admin Action)
    @PutMapping("/user/{id}/reset-password")
    public User resetPassword(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String newPassword = payload.get("newPassword");

        // VALIDATION: Check password length
        if (newPassword == null || newPassword.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    // --- 3. CREATE ADMIN ---
    @PostMapping("/create-admin")
    public User createAdmin(@RequestBody User adminUser) {
        // VALIDATION: Check password length
        if (adminUser.getPassword() == null || adminUser.getPassword().length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        if (userRepository.findByUsername(adminUser.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        adminUser.setRole("ADMIN");
        return userRepository.save(adminUser);
    }
}