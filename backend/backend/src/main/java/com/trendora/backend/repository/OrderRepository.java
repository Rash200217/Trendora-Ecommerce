package com.trendora.backend.repository;
import com.trendora.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Custom SQL to sum all sales
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    Double getTotalSales();
}
