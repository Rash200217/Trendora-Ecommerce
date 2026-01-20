package com.trendora.backend.controller;

import com.trendora.backend.model.*;
import com.trendora.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    @Autowired private WishlistRepository wishlistRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlist(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return wishlistRepository.findByUser(user);
    }

    @PostMapping("/add")
    public Wishlist addToWishlist(@RequestBody WishlistRequest request) {
        User user = userRepository.findById(request.userId).orElseThrow();
        Product product = productRepository.findById(request.productId).orElseThrow();

        // Check if already exists could be added here
        return wishlistRepository.save(new Wishlist(product, user));
    }

    @DeleteMapping("/{id}")
    public void removeFromWishlist(@PathVariable Long id) {
        wishlistRepository.deleteById(id);
    }

    static class WishlistRequest {
        public Long userId;
        public Long productId;
    }
}
