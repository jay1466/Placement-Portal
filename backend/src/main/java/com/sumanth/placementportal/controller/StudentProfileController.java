package com.sumanth.placementportal.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/student-profile")
public class StudentProfileController {
    // TODO: Refactor entirely in Phase 4
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        throw new UnsupportedOperationException("Phase 4 refactoring");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id) {
        throw new UnsupportedOperationException("Phase 4 refactoring");
    }
}