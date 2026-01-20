package com.trendora.backend.controller;

import com.trendora.backend.model.*;
import com.trendora.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired private CartItemRepository cartItemRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return cartItemRepository.findByUser(user);
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartRequest request) {
        User user = userRepository.findById(request.userId).orElseThrow();
        Product product = productRepository.findById(request.productId).orElseThrow();

        CartItem item = new CartItem(product, user, request.quantity, request.size);
        return cartItemRepository.save(item);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
    }

    // Helper DTO class
    static class CartRequest {
        public Long userId;
        public Long productId;
        public Integer quantity;
        public String size;
    }
}
