package com.sumanth.placementportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {
    // TODO: Phase 3 Automatic Eligibility Engine
    @Autowired
    private com.sumanth.placementportal.service.EligibilityService eligibilityService;

    @Autowired
    private com.sumanth.placementportal.repository.StudentRepository studentRepository;

    @Autowired
    private com.sumanth.placementportal.repository.DriveEligibilityRepository driveEligibilityRepository;

    @GetMapping("/eligibility/{studentId}/{driveId}")
    public ResponseEntity<?> checkEligibility(@PathVariable Long studentId, @PathVariable Long driveId) {
        try {
            com.sumanth.placementportal.entity.Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new IllegalArgumentException("Student not found"));

            // Get drive eligibility for the given drive ID
            com.sumanth.placementportal.entity.DriveEligibility eligibility = driveEligibilityRepository.findByPlacementDriveId(driveId)
                    .orElseThrow(() -> new IllegalArgumentException("Eligibility criteria not found for this drive"));

            return ResponseEntity.ok(eligibilityService.evaluate(student, eligibility));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}