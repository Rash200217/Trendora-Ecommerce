package com.trendora.backend.controller;

import com.trendora.backend.model.Product;
import com.trendora.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to talk to this
public class ChatController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/ask")
    public String askBot(@RequestBody Map<String, String> payload) {
        String message = payload.get("message").trim().toLowerCase();

        // 1. BASIC GREETINGS
        if (message.matches(".*\\b(hi|hello|hey|greetings)\\b.*")) {
            return "Hello! I am Trendora Bot. You can ask me about products, prices, or categories!";
        }

        // 2. HELP COMMAND
        if (message.contains("help") || message.contains("support")) {
            return "I can help you find clothes! Try asking: 'Show me shirts', 'Price of red dress', or 'Do you have items for men?'.";
        }

        // 3. CATEGORY INQUIRIES
        if (message.contains("men") || message.contains("man")) {
            long count = productRepository.findAll().stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase("MAN")).count();
            return "We have " + count + " items in our Men's collection. Check the 'Man' tab!";
        }
        if (message.contains("women") || message.contains("woman")) {
            long count = productRepository.findAll().stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase("WOMAN")).count();
            return "We have " + count + " items in our Women's collection. Check the 'Woman' tab!";
        }

        // 4. DATABASE PRODUCT SEARCH (SMART SEARCH)
        // This looks for any product name that matches words in the user's message
        List<Product> allProducts = productRepository.findAll();

        // Find products where the name is inside the message (e.g., user says "price of Denim Shirt")
        List<Product> matches = allProducts.stream()
                .filter(p -> message.contains(p.getName().toLowerCase()) || p.getName().toLowerCase().contains(message))
                .collect(Collectors.toList());

        if (!matches.isEmpty()) {
            Product p = matches.get(0); // Get the best match
            if (message.contains("price") || message.contains("cost")) {
                return "The **" + p.getName() + "** costs **LKR " + p.getPrice() + "**.";
            } else {
                return "Yes! We have the **" + p.getName() + "** available for LKR " + p.getPrice() + ". Would you like to add it to your cart?";
            }
        }

        // 5. FALLBACK
        return "I'm sorry, I couldn't find that product in our store. Try searching for a specific name like 'Shirt' or 'Dress'.";
    }
}
