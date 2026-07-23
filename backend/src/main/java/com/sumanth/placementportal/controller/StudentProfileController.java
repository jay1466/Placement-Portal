package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    @GetMapping("/profile/{id}")
    public Student getProfile(
            @PathVariable Long id){

        return studentProfileService.getProfile(id);

    }

    @PutMapping("/profile/{id}")
    public Student updateProfile(
            @PathVariable Long id,
            @RequestBody Student student){

        return studentProfileService.updateProfile(
                id,
                student
        );

    }

}