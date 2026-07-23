package com.sumanth.placementportal.service;

import com.sumanth.placementportal.dto.RecruiterRegisterRequest;
import com.sumanth.placementportal.entity.Recruiter;
import com.sumanth.placementportal.entity.User;
import com.sumanth.placementportal.repository.RecruiterRepository;
import com.sumanth.placementportal.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ================= Register Recruiter =================

    public Recruiter registerRecruiter(RecruiterRegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Save User

        User user = new User();

        user.setUsername(request.getRecruiterName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole("RECRUITER");

        User savedUser = userRepository.save(user);

        // Save Recruiter Profile

        Recruiter recruiter = new Recruiter();

        recruiter.setCompanyName(request.getCompanyName());
        recruiter.setPhone(request.getPhone());
        recruiter.setWebsite(request.getWebsite());
        recruiter.setLocation(request.getLocation());
        recruiter.setDesignation(request.getDesignation());

        recruiter.setUser(savedUser);

        return recruiterRepository.save(recruiter);
    }

    // ================= Save Recruiter =================

    public Recruiter saveRecruiter(Recruiter recruiter) {
        return recruiterRepository.save(recruiter);
    }

    // ================= Get All Recruiters =================

    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }

    // ================= Get Recruiter By Id =================

    public Optional<Recruiter> getRecruiterById(Long id) {
        return recruiterRepository.findById(id);
    }

    // ================= Update Recruiter =================

    public Recruiter updateRecruiter(
            Long id,
            Recruiter recruiterDetails) {

        Recruiter recruiter =
                recruiterRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Recruiter Not Found"));

        recruiter.setCompanyName(
                recruiterDetails.getCompanyName());

        recruiter.setPhone(
                recruiterDetails.getPhone());

        recruiter.setWebsite(
                recruiterDetails.getWebsite());

        recruiter.setLocation(
                recruiterDetails.getLocation());

        recruiter.setDesignation(
                recruiterDetails.getDesignation());

        return recruiterRepository.save(recruiter);
    }

    // ================= Delete Recruiter =================

    public void deleteRecruiter(Long id) {
        recruiterRepository.deleteById(id);
    }

}