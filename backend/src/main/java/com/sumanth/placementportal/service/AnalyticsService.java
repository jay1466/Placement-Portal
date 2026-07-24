package com.sumanth.placementportal.service;

import com.sumanth.placementportal.dto.DashboardMetricsDTO;
import com.sumanth.placementportal.entity.Application;
import com.sumanth.placementportal.entity.ApplicationStatus;
import com.sumanth.placementportal.entity.CompanyStatus;
import com.sumanth.placementportal.repository.ApplicationRepository;
import com.sumanth.placementportal.repository.CompanyRepository;
import com.sumanth.placementportal.repository.PlacementDriveRepository;
import com.sumanth.placementportal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public DashboardMetricsDTO getAdminDashboardMetrics() {
        long totalStudents = studentRepository.count();
        long totalCompanies = companyRepository.findAll().stream()
                .filter(c -> c.getStatus() == CompanyStatus.APPROVED)
                .count();
        long totalPlacementDrives = placementDriveRepository.count();

        List<Application> acceptedApplications = applicationRepository.findAll().stream()
                .filter(a -> a.getStatus() == ApplicationStatus.ACCEPTED)
                .toList();
                
        // Total placed students (unique students who have ACCEPTED an offer)
        long totalPlacedStudents = acceptedApplications.stream()
                .map(a -> a.getStudent().getId())
                .distinct()
                .count();

        // Branch-wise placements
        Map<String, Long> branchWisePlacements = acceptedApplications.stream()
                .filter(a -> a.getStudent().getBranch() != null)
                .collect(Collectors.groupingBy(
                        a -> a.getStudent().getBranch(),
                        Collectors.mapping(a -> a.getStudent().getId(), Collectors.collectingAndThen(Collectors.toSet(), set -> (long) set.size()))
                ));

        return DashboardMetricsDTO.builder()
                .totalStudents(totalStudents)
                .totalCompanies(totalCompanies)
                .totalPlacementDrives(totalPlacementDrives)
                .totalPlacedStudents(totalPlacedStudents)
                .branchWisePlacements(branchWisePlacements)
                .build();
    }
}
