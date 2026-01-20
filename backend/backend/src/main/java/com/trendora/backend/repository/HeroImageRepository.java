package com.trendora.backend.repository;
import com.trendora.backend.model.HeroImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeroImageRepository extends JpaRepository<HeroImage, Long> {
}
