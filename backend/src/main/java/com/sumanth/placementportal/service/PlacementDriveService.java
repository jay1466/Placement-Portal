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
        throw new UnsupportedOperationException("Phase 3 refactoring");
    }

    public void deleteDrive(Long id) {
        placementDriveRepository.deleteById(id);
    }
}