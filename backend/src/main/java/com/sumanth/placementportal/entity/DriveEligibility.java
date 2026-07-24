package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "drive_eligibility")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriveEligibility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "placement_drive_id", nullable = false, unique = true)
    private PlacementDrive placementDrive;

    private String eligibleBranches; // e.g., "CSE,IT,ECE"
    private Integer passingYear;
    
    private Double minimumCgpa;
    
    private Integer maxCurrentBacklogs;
    private Integer maxDeadBacklogs;

    private String gender; // ANY, MALE, FEMALE
    
    private Double minimumTenthPercent;
    private Double minimumTwelfthPercent;
    private Double minimumDiplomaCgpa;

    private Double minimumSem1Sgpa;
    private Double minimumSem2Sgpa;
    private Double minimumSem3Sgpa;
    private Double minimumSem4Sgpa;
    private Double minimumSem5Sgpa;
    private Double minimumSem6Sgpa;
    
    // Sem 7 and 8 omitted as per requirements
}
