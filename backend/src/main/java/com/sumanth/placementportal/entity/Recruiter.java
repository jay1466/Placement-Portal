package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recruiters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(name = "hr_name", nullable = false)
    private String hrName;

    private String designation;
    
    private String phone;
    
    @Column(name = "linkedin_profile")
    private String linkedinProfile;

    @Column(name = "is_first_login")
    private boolean isFirstLogin = true;
}