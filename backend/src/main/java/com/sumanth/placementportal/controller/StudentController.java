package com.sumanth.placementportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    @Autowired
    private com.sumanth.placementportal.service.StudentProfileService studentProfileService;

    @PutMapping("/{studentId}/profile")
    public org.springframework.http.ResponseEntity<?> updateProfile(@PathVariable Long studentId, @RequestBody com.sumanth.placementportal.dto.StudentProfileUpdateRequest request) {
        try {
            return org.springframework.http.ResponseEntity.ok(studentProfileService.updateProfile(studentId, request));
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{studentId}/profile/lock")
    public org.springframework.http.ResponseEntity<?> lockProfile(@PathVariable Long studentId) {
        try {
            studentProfileService.lockProfile(studentId);
            return org.springframework.http.ResponseEntity.ok("Profile locked successfully.");
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{studentId}/profile/unlock")
    public org.springframework.http.ResponseEntity<?> unlockProfile(@PathVariable Long studentId) {
        try {
            studentProfileService.unlockProfile(studentId);
            return org.springframework.http.ResponseEntity.ok("Profile unlocked successfully.");
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}