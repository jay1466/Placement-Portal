package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    @Autowired
    private CompanyService companyService;

    // Recruiter submits updates to their company profile
    @PostMapping("/company-update/{companyId}")
    public ResponseEntity<?> submitCompanyUpdate(@PathVariable Long companyId, @RequestBody String jsonChanges) {
        try {
            companyService.submitCompanyUpdate(companyId, jsonChanges);
            return ResponseEntity.ok("Company profile update submitted for admin approval.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}