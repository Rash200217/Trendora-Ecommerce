package com.trendora.backend.controller;
import com.trendora.backend.model.Order;
import com.trendora.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired private OrderRepository orderRepository;

    @PostMapping
    public void createOrder(@RequestBody Order order) {
        orderRepository.save(new Order(order.getTotalPrice()));
    }
}
