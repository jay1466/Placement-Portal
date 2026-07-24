package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "enrollment_no", unique = true, nullable = false)
    private String enrollmentNo;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String phone;
    
    private String gender;

    // Academic Details
    private String branch;
    
    @Column(name = "graduation_year")
    private Integer graduationYear;

    @Column(name = "tenth_percent")
    private Double tenthPercent;

    @Column(name = "twelfth_percent")
    private Double twelfthPercent;

    @Column(name = "diploma_cgpa")
    private Double diplomaCgpa;

    @Column(name = "sem1_sgpa")
    private Double sem1Sgpa;

    @Column(name = "sem2_sgpa")
    private Double sem2Sgpa;

    @Column(name = "sem3_sgpa")
    private Double sem3Sgpa;

    @Column(name = "sem4_sgpa")
    private Double sem4Sgpa;

    @Column(name = "sem5_sgpa")
    private Double sem5Sgpa;

    @Column(name = "sem6_sgpa")
    private Double sem6Sgpa;

    private Double cgpa;

    @Column(name = "current_backlogs")
    private Integer currentBacklogs = 0;

    @Column(name = "dead_backlogs")
    private Integer deadBacklogs = 0;

    // Professional Details (Socials)
    private String portfolio;
    private String github;
    private String linkedin;
    private String leetcode;
    private String codechef;
    private String codeforces;

    // Lock status
    @Column(name = "is_profile_locked")
    private boolean isProfileLocked = false;
    
    @Column(name = "profile_completion_percentage")
    private Integer profileCompletionPercentage = 0;

}