package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.dto.CompanyMatchResponse;
import com.sumanth.placementportal.entity.Company;
import com.sumanth.placementportal.entity.Resume;
import com.sumanth.placementportal.repository.CompanyRepository;
import com.sumanth.placementportal.repository.ResumeRepository;
import com.sumanth.placementportal.service.MatchingService;
import com.sumanth.placementportal.service.ResumeAnalyzerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/matching")
@CrossOrigin(origins = "http://localhost:5173")
public class MatchingController {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ResumeAnalyzerService resumeAnalyzerService;

    @Autowired
    private MatchingService matchingService;

    @GetMapping("/{studentId}")
    public List<CompanyMatchResponse> getRecommendations(
            @PathVariable Long studentId) throws Exception {

        Resume resume = resumeRepository
                .findTopByStudentIdOrderByIdDesc(studentId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        String resumeText =
                resumeAnalyzerService.extractResumeText(
                        resume.getFilePath());

        List<CompanyMatchResponse> recommendations =
                new ArrayList<>();

        List<Company> companies =
                companyRepository.findAll();

        for (Company company : companies) {

            int match =
                    matchingService.calculateMatch(
                            resumeText,
                            company.getSkills());

            recommendations.add(
                    new CompanyMatchResponse(
                            company.getId(),
                            company.getCompanyName(),
                            match
                    )
            );
        }

        recommendations.sort(
                Comparator.comparing(
                                CompanyMatchResponse::getMatchPercentage)
                        .reversed());

        return recommendations;
    }
}