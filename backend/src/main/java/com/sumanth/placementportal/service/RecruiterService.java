package com.sumanth.placementportal.service;

import com.sumanth.placementportal.dto.RecruiterRegisterRequest;
import com.sumanth.placementportal.entity.Recruiter;
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

    public Recruiter registerRecruiter(RecruiterRegisterRequest request) {
        throw new UnsupportedOperationException("Phase 2 - Implement with new schema");
    }

    public Recruiter saveRecruiter(Recruiter recruiter) {
        throw new UnsupportedOperationException("Phase 2 - Implement with new schema");
    }

    public List<Recruiter> getAllRecruiters() {
        return recruiterRepository.findAll();
    }

    public Optional<Recruiter> getRecruiterById(Long id) {
        return recruiterRepository.findById(id);
    }

    public Recruiter updateRecruiter(Long id, Recruiter recruiterDetails) {
        throw new UnsupportedOperationException("Phase 2 - Implement with new schema");
    }

    public void deleteRecruiter(Long id) {
        recruiterRepository.deleteById(id);
    }
}