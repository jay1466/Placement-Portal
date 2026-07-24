package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.entity.StudentDocument;
import com.sumanth.placementportal.repository.StudentDocumentRepository;
import com.sumanth.placementportal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class StudentDocumentService {

    @Autowired
    private StudentDocumentRepository studentDocumentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public StudentDocument uploadDocument(Long studentId, String documentType, MultipartFile file) throws IOException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        if (student.isProfileLocked()) {
            throw new IllegalStateException("Profile is locked. Cannot upload documents.");
        }

        StudentDocument studentDocument = studentDocumentRepository.findByStudentId(studentId)
                .orElse(StudentDocument.builder().student(student).build());

        String fileUrl = cloudinaryService.uploadFile(file);

        switch (documentType) {
            case "resume":
                studentDocument.setResumeUrl(fileUrl);
                break;
            case "passportPhoto":
                studentDocument.setPassportPhotoUrl(fileUrl);
                break;
            case "tenthMarksheet":
                studentDocument.setTenthMarksheetUrl(fileUrl);
                break;
            case "twelfthMarksheet":
                studentDocument.setTwelfthMarksheetUrl(fileUrl);
                break;
            case "diplomaMarksheet":
                studentDocument.setDiplomaMarksheetUrl(fileUrl);
                break;
            case "sem1Marksheet":
                studentDocument.setSem1MarksheetUrl(fileUrl);
                break;
            case "sem2Marksheet":
                studentDocument.setSem2MarksheetUrl(fileUrl);
                break;
            case "sem3Marksheet":
                studentDocument.setSem3MarksheetUrl(fileUrl);
                break;
            case "sem4Marksheet":
                studentDocument.setSem4MarksheetUrl(fileUrl);
                break;
            case "sem5Marksheet":
                studentDocument.setSem5MarksheetUrl(fileUrl);
                break;
            case "sem6Marksheet":
                studentDocument.setSem6MarksheetUrl(fileUrl);
                break;
            case "backlogMarksheet":
                studentDocument.setBacklogMarksheetUrl(fileUrl);
                break;
            default:
                throw new IllegalArgumentException("Invalid document type: " + documentType);
        }

        studentDocument.setLastUpdated(LocalDateTime.now());
        return studentDocumentRepository.save(studentDocument);
    }
}
