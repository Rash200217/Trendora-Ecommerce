package com.trendora.backend.controller;

import com.trendora.backend.model.Product;
import com.trendora.backend.repository.CartItemRepository;
import com.trendora.backend.repository.ProductRepository;
import com.trendora.backend.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    // 1. GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. SEARCH PRODUCTS (Name or Description)
    // URL: http://localhost:8080/api/products/search?query=shirt
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    // 3. GET PRODUCTS BY CATEGORY (MAN, WOMAN, KIDS)
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    // 4. GET SINGLE PRODUCT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not exist with id :" + id));
        return ResponseEntity.ok(product);
    }

    // 5. CREATE PRODUCT
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // 6. UPDATE PRODUCT
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not exist with id :" + id));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setImageUrl(productDetails.getImageUrl());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());

        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    // 7. SAFE DELETE PRODUCT
    // Removes product from user carts and wishlists first to prevent database errors
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not exist with id :" + id));

        // Step 1: Remove from all Carts
        cartItemRepository.deleteByProduct(product);

        // Step 2: Remove from all Wishlists
        wishlistRepository.deleteByProduct(product);

        // Step 3: Delete the product itself
        productRepository.delete(product);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}