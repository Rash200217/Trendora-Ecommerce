package com.trendora.backend.controller;

import com.trendora.backend.model.HeroImage;
import com.trendora.backend.repository.HeroImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hero-images")
@CrossOrigin(origins = "http://localhost:3000")
public class HeroImageController {

    @Autowired private HeroImageRepository repository;

    @GetMapping
    public List<HeroImage> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public HeroImage add(@RequestBody HeroImage image) {
        return repository.save(image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}