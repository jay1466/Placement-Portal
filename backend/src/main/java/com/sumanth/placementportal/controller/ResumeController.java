package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Resume;
import com.sumanth.placementportal.repository.ResumeRepository;
import com.sumanth.placementportal.service.ResumeAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @Autowired
    private ResumeAnalyzerService resumeAnalyzerService;

    @Autowired
    private ResumeRepository resumeRepository;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(

            @RequestParam("file") MultipartFile file,
            @RequestParam("studentId") Long studentId

    ) {

        try {

            // Create uploads folder inside project
            File uploadDir = new File(System.getProperty("user.dir"), "uploads");

            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Unique filename
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Destination file
            File destination = new File(uploadDir, fileName);

            // Save uploaded file
            file.transferTo(destination);

            // Debug
            System.out.println("==================================");
            System.out.println("File Saved At : " + destination.getAbsolutePath());
            System.out.println("File Exists   : " + destination.exists());
            System.out.println("==================================");

            // Analyze Resume
            int score = resumeAnalyzerService.analyzeResume(destination.getAbsolutePath());

            // Save to Database
            Resume resume = new Resume();

            resume.setStudentId(studentId);
            resume.setFileName(file.getOriginalFilename());
            resume.setFilePath(destination.getAbsolutePath());
            resume.setScore(score);

            resumeRepository.save(resume);

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Resume analyzed successfully");
            response.put("score", score);
            response.put("fileName", file.getOriginalFilename());

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }

}