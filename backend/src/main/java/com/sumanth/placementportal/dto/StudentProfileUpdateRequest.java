package com.sumanth.placementportal.dto;

import lombok.Data;
import java.util.List;

@Data
public class StudentProfileUpdateRequest {
    // Basic Details
    private String firstName;
    private String lastName;
    private String phone;
    private String gender;

    // Academics
    private String branch;
    private Integer graduationYear;
    private Double tenthPercent;
    private Double twelfthPercent;
    private Double diplomaCgpa;
    private Double sem1Sgpa;
    private Double sem2Sgpa;
    private Double sem3Sgpa;
    private Double sem4Sgpa;
    private Double sem5Sgpa;
    private Double sem6Sgpa;
    private Double cgpa;
    private Integer currentBacklogs;
    private Integer deadBacklogs;

    // Socials
    private String portfolio;
    private String github;
    private String linkedin;
    private String leetcode;
    private String codechef;
    private String codeforces;

    // Skills & Projects
    private List<StudentSkillDTO> skills;
    private List<StudentProjectDTO> projects;
}
