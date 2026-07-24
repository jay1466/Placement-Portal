package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "placement_drives")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String role; // Job Role

    private String employmentType; // Internship, Full Time, Both
    private String ctc;
    private String stipend;
    private String location;
    private String workMode; // Remote, Hybrid, Onsite
    private String bondDetails;
    
    private String jobDescriptionPdfUrl;
    
    @Column(columnDefinition = "TEXT")
    private String hiringProcess;
    
    private String selectionRounds;
    
    private LocalDateTime applicationDeadline;
    private String expectedJoiningDate;
    private Integer numberOfOpenings;
    
    @Column(columnDefinition = "TEXT")
    private String requiredSkills;
    
    @Column(columnDefinition = "TEXT")
    private String preferredSkills;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DriveStatus status = DriveStatus.DRAFT;

    @OneToOne(mappedBy = "placementDrive", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private DriveEligibility eligibility;
}