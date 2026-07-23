package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.PlacementDrive;
import com.sumanth.placementportal.repository.PlacementDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacementDriveService {

    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    public List<PlacementDrive> getAllDrives() {
        return placementDriveRepository.findAll();
    }

    public PlacementDrive saveDrive(PlacementDrive drive) {
        return placementDriveRepository.save(drive);
    }

    public PlacementDrive getDriveById(Long id) {
        return placementDriveRepository.findById(id).orElse(null);
    }

    public PlacementDrive updateDrive(Long id, PlacementDrive updatedDrive) {

        PlacementDrive drive = placementDriveRepository.findById(id).orElse(null);

        if (drive != null) {
            drive.setDriveName(updatedDrive.getDriveName());
            drive.setCompanyName(updatedDrive.getCompanyName());
            drive.setJobRole(updatedDrive.getJobRole());
            drive.setPackageLpa(updatedDrive.getPackageLpa());
            drive.setEligibilityCgpa(updatedDrive.getEligibilityCgpa());
            drive.setDriveDate(updatedDrive.getDriveDate());

            return placementDriveRepository.save(drive);
        }

        return null;
    }

    public void deleteDrive(Long id) {
        placementDriveRepository.deleteById(id);
    }
}