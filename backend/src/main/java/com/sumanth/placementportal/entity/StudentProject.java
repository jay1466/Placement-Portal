package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String technologiesUsed; // e.g., "React, Spring Boot, Postgres"
    
    private String projectLink; // GitHub or Live Link
}
