package com.trendora.backend.repository;

import com.trendora.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // This is the custom method required for your login logic.
    // Spring Data JPA automatically generates the SQL for this based on the method name.
    User findByUsername(String username);

    // Optional: If you want to check if a username exists during signup to prevent duplicates
    Boolean existsByUsername(String username);
}
