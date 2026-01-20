package com.trendora.backend.repository;

import com.trendora.backend.model.Wishlist;
import com.trendora.backend.model.Product; // Import Product
import com.trendora.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(User user);

    // --- ADD THIS MISSING METHOD ---
    @Transactional
    void deleteByProduct(Product product);
}