package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Application;
import com.sumanth.placementportal.entity.ApplicationStatus;
import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.entity.PlacementDrive;
import com.sumanth.placementportal.entity.DriveEligibility;
import com.sumanth.placementportal.dto.EligibilityResult;
import com.sumanth.placementportal.repository.ApplicationRepository;
import com.sumanth.placementportal.repository.StudentRepository;
import com.sumanth.placementportal.repository.PlacementDriveRepository;
import com.sumanth.placementportal.repository.DriveEligibilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    @Autowired
    private DriveEligibilityRepository driveEligibilityRepository;

    @Autowired
    private EligibilityService eligibilityService;

    public Application applyForDrive(Long studentId, Long driveId) {
        // 1. Check if already applied
        if (applicationRepository.existsByStudentIdAndPlacementDriveId(studentId, driveId)) {
            throw new IllegalArgumentException("Student has already applied for this drive.");
        }

        // 2. Fetch entities
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found."));
        PlacementDrive drive = placementDriveRepository.findById(driveId)
                .orElseThrow(() -> new IllegalArgumentException("Placement drive not found."));

        // 3. Evaluate Eligibility
        DriveEligibility eligibility = driveEligibilityRepository.findByPlacementDriveId(driveId)
                .orElseThrow(() -> new IllegalArgumentException("Eligibility criteria not defined for this drive."));
                
        EligibilityResult result = eligibilityService.evaluate(student, eligibility);
        if (!result.isEligible()) {
            throw new IllegalStateException("Student is not eligible for this drive. Reason: " + result.getCriteriaStatus().toString());
        }

        // 4. Create Application
        Application application = Application.builder()
                .student(student)
                .placementDrive(drive)
                .status(ApplicationStatus.APPLIED)
                .build();

        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Long applicationId, String statusString) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found."));
                
        ApplicationStatus newStatus = ApplicationStatus.valueOf(statusString);
        application.setStatus(newStatus);
        
        return applicationRepository.save(application);
    }

    public List<Application> getStudentApplications(Long studentId) {
        return applicationRepository.findAll().stream()
                .filter(a -> a.getStudent().getId().equals(studentId))
                .toList();
    }

    public List<Application> getDriveApplications(Long driveId) {
        return applicationRepository.findAll().stream()
                .filter(a -> a.getPlacementDrive().getId().equals(driveId))
                .toList();
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}