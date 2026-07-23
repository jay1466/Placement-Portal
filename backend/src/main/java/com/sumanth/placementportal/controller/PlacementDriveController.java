package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.PlacementDrive;
import com.sumanth.placementportal.service.PlacementDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlacementDriveController {

    @Autowired
    private PlacementDriveService placementDriveService;

    @GetMapping("/drives")
    public List<PlacementDrive> getAllDrives() {
        return placementDriveService.getAllDrives();
    }

    @GetMapping("/drives/{id}")
    public PlacementDrive getDriveById(@PathVariable Long id) {
        return placementDriveService.getDriveById(id);
    }

    @PostMapping("/drives")
    public PlacementDrive addDrive(@RequestBody PlacementDrive drive) {
        return placementDriveService.saveDrive(drive);
    }

    @PutMapping("/drives/{id}")
    public PlacementDrive updateDrive(@PathVariable Long id,
                                      @RequestBody PlacementDrive drive) {
        return placementDriveService.updateDrive(id, drive);
    }

    @DeleteMapping("/drives/{id}")
    public String deleteDrive(@PathVariable Long id) {
        placementDriveService.deleteDrive(id);
        return "Drive deleted successfully!";
    }
}