package com.trendora.backend.repository;

import com.trendora.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);

    // --- NEW SEARCH METHOD ---
    // Finds products where name OR description contains the keyword (case insensitive)
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
