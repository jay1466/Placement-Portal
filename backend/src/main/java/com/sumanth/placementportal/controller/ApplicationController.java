package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyForDrive(@RequestParam Long studentId, @RequestParam Long driveId) {
        try {
            return ResponseEntity.ok(applicationService.applyForDrive(studentId, driveId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long applicationId, @RequestParam String status) {
        try {
            return ResponseEntity.ok(applicationService.updateApplicationStatus(applicationId, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentApplications(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getStudentApplications(studentId));
    }

    @GetMapping("/drive/{driveId}")
    public ResponseEntity<?> getDriveApplications(@PathVariable Long driveId) {
        return ResponseEntity.ok(applicationService.getDriveApplications(driveId));
    }
}