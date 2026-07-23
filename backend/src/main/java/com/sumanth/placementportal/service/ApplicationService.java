package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Application;
import com.sumanth.placementportal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    // Get all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // Get applications by student ID
    public List<Application> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    // Save application
    public Application saveApplication(Application application) {

        // Save application in database
        Application savedApplication = applicationRepository.save(application);

        // Send email (don't fail if email has an error)
        try {
            emailService.sendSelectionMail(application.getEmail());
        } catch (Exception e) {
            System.out.println("Email sending failed: " + e.getMessage());
        }

        // Save notification (don't fail if notification has an error)
        try {
            notificationService.createNotification(
                    application.getStudentId(),
                    "Application Submitted",
                    "Your application for Company ID "
                            + application.getDriveId()
                            + " has been submitted successfully."
            );
        } catch (Exception e) {
            System.out.println("Notification creation failed: " + e.getMessage());
        }

        return savedApplication;
    }

    // Get application by ID
    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    // Update application
    public Application updateApplication(Long id, Application updatedApplication) {

        Application application = applicationRepository.findById(id).orElse(null);

        if (application != null) {

            application.setStudentId(updatedApplication.getStudentId());
            application.setDriveId(updatedApplication.getDriveId());
            application.setApplicationStatus(updatedApplication.getApplicationStatus());
            application.setFullName(updatedApplication.getFullName());
            application.setEmail(updatedApplication.getEmail());
            application.setPhone(updatedApplication.getPhone());
            application.setBranch(updatedApplication.getBranch());
            application.setCgpa(updatedApplication.getCgpa());
            application.setCoverLetter(updatedApplication.getCoverLetter());

            return applicationRepository.save(application);
        }

        return null;
    }

    // Delete application
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}