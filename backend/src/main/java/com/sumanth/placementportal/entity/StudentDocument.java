package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    // Cloudinary details for each document type
    private String resumeUrl;
    private String passportPhotoUrl;
    private String tenthMarksheetUrl;
    private String twelfthMarksheetUrl;
    private String diplomaMarksheetUrl;
    
    private String sem1MarksheetUrl;
    private String sem2MarksheetUrl;
    private String sem3MarksheetUrl;
    private String sem4MarksheetUrl;
    private String sem5MarksheetUrl;
    private String sem6MarksheetUrl;
    
    private String backlogMarksheetUrl;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;
}
