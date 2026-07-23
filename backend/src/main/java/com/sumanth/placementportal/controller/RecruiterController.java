package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.dto.RecruiterRegisterRequest;
import com.sumanth.placementportal.entity.Recruiter;
import com.sumanth.placementportal.service.RecruiterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:5173")
public class RecruiterController {

    @Autowired
    private RecruiterService recruiterService;

    // ================= REGISTER RECRUITER =================

    @PostMapping("/register")
    public Recruiter registerRecruiter(
            @RequestBody RecruiterRegisterRequest request) {

        return recruiterService.registerRecruiter(request);
    }

    // ================= SAVE RECRUITER =================

    @PostMapping
    public Recruiter saveRecruiter(
            @RequestBody Recruiter recruiter) {

        return recruiterService.saveRecruiter(recruiter);
    }

    // ================= GET ALL RECRUITERS =================

    @GetMapping
    public List<Recruiter> getAllRecruiters() {

        return recruiterService.getAllRecruiters();
    }

    // ================= GET RECRUITER BY ID =================

    @GetMapping("/{id}")
    public Optional<Recruiter> getRecruiterById(
            @PathVariable Long id) {

        return recruiterService.getRecruiterById(id);
    }

    // ================= UPDATE RECRUITER =================

    @PutMapping("/{id}")
    public Recruiter updateRecruiter(
            @PathVariable Long id,
            @RequestBody Recruiter recruiter) {

        return recruiterService.updateRecruiter(id, recruiter);
    }

    // ================= DELETE RECRUITER =================

    @DeleteMapping("/{id}")
    public String deleteRecruiter(
            @PathVariable Long id) {

        recruiterService.deleteRecruiter(id);

        return "Recruiter Deleted Successfully";
    }

}