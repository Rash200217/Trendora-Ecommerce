package com.trendora.backend.controller;

import com.trendora.backend.model.Order;
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
    private PasswordEncoder passwordEncoder; // For Encryption

    // --- 1. DASHBOARD STATS ---
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("productCount", productRepository.count());
        stats.put("userCount", userRepository.count());

        // Calculate Total Sales
        Double totalSales = orderRepository.getTotalSales();
        stats.put("totalSales", totalSales != null ? totalSales : 0.0);

        return stats;
    }

    // --- 2. USER MANAGEMENT ---

    // Get all users for the table
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Reset User Password (ENCRYPTED)
    @PutMapping("/user/{id}/reset-password")
    public User resetPassword(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newRawPassword = payload.get("newPassword");

        // Encrypt before saving
        user.setPassword(passwordEncoder.encode(newRawPassword));

        return userRepository.save(user);
    }

    // --- 3. CREATE NEW ADMIN (ENCRYPTED) ---
    @PostMapping("/create-admin")
    public User createAdmin(@RequestBody User adminUser) {
        if (userRepository.findByUsername(adminUser.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }

        // Encrypt Password
        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));

        // Force Role to ADMIN
        adminUser.setRole("ADMIN");

        return userRepository.save(adminUser);
    }
}
