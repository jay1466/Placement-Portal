package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    private String logoUrl;
    private String bannerUrl;
    
    private String website;
    private String careerPage;
    private String linkedin;
    private String industry;
    
    @Column(columnDefinition = "TEXT")
    private String aboutCompany;
    
    private String companySize;
    private Integer foundedYear;
    private String headquarters;
    private String workingLocations;

    // Verification details (visible only to Admin)
    private String gstNumber;
    private String registrationCertificateUrl;
    private String companyAddress;
    private String companyPhotosUrl; // Or JSON array if multiple

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CompanyStatus status = CompanyStatus.PENDING_VERIFICATION;
}