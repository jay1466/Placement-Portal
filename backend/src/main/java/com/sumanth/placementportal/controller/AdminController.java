package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.dto.CreateRecruiterRequest;
import com.sumanth.placementportal.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/recruiters")
    public ResponseEntity<?> createRecruiter(@RequestBody CreateRecruiterRequest request) {
        try {
            adminService.createRecruiter(request);
            return ResponseEntity.ok("Recruiter account created successfully. Email sent with temporary password.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Autowired
    private com.sumanth.placementportal.service.CompanyService companyService;

    @GetMapping("/company-updates")
    public ResponseEntity<?> getPendingCompanyUpdates() {
        return ResponseEntity.ok(companyService.getPendingUpdates());
    }

    @PostMapping("/company-updates/{id}/approve")
    public ResponseEntity<?> approveCompanyUpdate(@PathVariable Long id) {
        try {
            companyService.approveUpdate(id);
            return ResponseEntity.ok("Company update approved.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/company-updates/{id}/reject")
    public ResponseEntity<?> rejectCompanyUpdate(@PathVariable Long id) {
        try {
            companyService.rejectUpdate(id);
            return ResponseEntity.ok("Company update rejected.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
