package com.trendora.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "hero_images")
public class HeroImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    public HeroImage() {}
    public HeroImage(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
