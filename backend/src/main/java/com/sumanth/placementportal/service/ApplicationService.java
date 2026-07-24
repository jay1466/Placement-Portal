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

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application updateApplication(Long id, Application updatedApplication) {
        throw new UnsupportedOperationException("Phase 4 refactoring");
    }

    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }
}