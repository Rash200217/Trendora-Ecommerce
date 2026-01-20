package com.trendora.backend.controller;

import com.trendora.backend.model.User;
import com.trendora.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired private ProductRepository productRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private OrderRepository orderRepository;

    // 1. Dashboard Stats
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("productCount", productRepository.count());
        stats.put("userCount", userRepository.count());

        Double totalSales = orderRepository.getTotalSales();
        stats.put("totalSales", totalSales != null ? totalSales : 0.0);

        return stats;
    }

    // 2. Get All Users (For Password Management)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 3. Reset User Password
    @PutMapping("/user/{id}/reset-password")
    public User resetPassword(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        User user = userRepository.findById(id).orElseThrow();
        user.setPassword(payload.get("newPassword")); // In real app, encrypt this!
        return userRepository.save(user);
    }

    // 4. Create New Admin
    @PostMapping("/create-admin")
    public User createAdmin(@RequestBody User adminUser) {
        if (userRepository.findByUsername(adminUser.getUsername()) != null) {
            throw new RuntimeException("Username taken");
        }
        adminUser.setRole("ADMIN");
        return userRepository.save(adminUser);
    }
}
