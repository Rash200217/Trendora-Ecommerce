package com.trendora.backend.repository;

import com.trendora.backend.model.CartItem;
import com.trendora.backend.model.Product; // Import Product
import com.trendora.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional; // Import Transactional

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);

    @Transactional
    void deleteByUser(User user);

    // --- ADD THIS MISSING METHOD ---
    @Transactional
    void deleteByProduct(Product product);
}