package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.service.StudentDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/student/{studentId}/documents")
public class StudentDocumentController {

    @Autowired
    private StudentDocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@PathVariable Long studentId,
                                            @RequestParam("documentType") String documentType,
                                            @RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(documentService.uploadDocument(studentId, documentType, file));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
