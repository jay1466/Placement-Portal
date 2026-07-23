package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Application;
import com.sumanth.placementportal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Get all applications
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // Get applications of a student
    @GetMapping("/student/{studentId}")
    public List<Application> getStudentApplications(@PathVariable Long studentId) {
        return applicationService.getApplicationsByStudentId(studentId);
    }

    // Get application by ID
    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id);
    }

    // Submit application
    @PostMapping
    public Application addApplication(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }

    // Update application
    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @RequestBody Application application) {

        return applicationService.updateApplication(id, application);
    }

    // Delete application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return "Application Deleted Successfully";
    }
}