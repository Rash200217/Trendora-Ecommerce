package com.trendora.backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double totalPrice;
    private LocalDateTime orderDate;

    public Order() {}
    public Order(Double totalPrice) {
        this.totalPrice = totalPrice;
        this.orderDate = LocalDateTime.now();
    }
    // Getters
    public Double getTotalPrice() { return totalPrice; }
}
