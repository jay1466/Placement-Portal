package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class StudentProfileService {
    @Autowired
    private com.sumanth.placementportal.repository.StudentRepository studentRepository;
    
    @Autowired
    private com.sumanth.placementportal.repository.StudentSkillRepository studentSkillRepository;
    
    @Autowired
    private com.sumanth.placementportal.repository.StudentProjectRepository studentProjectRepository;

    @Transactional
    public Student updateProfile(Long studentId, com.sumanth.placementportal.dto.StudentProfileUpdateRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        if (student.isProfileLocked()) {
            throw new IllegalStateException("Profile is locked. Please contact the Admin to unlock.");
        }

        // Update Basic Info
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setPhone(request.getPhone());
        student.setGender(request.getGender());

        // Update Academics
        student.setBranch(request.getBranch());
        student.setGraduationYear(request.getGraduationYear());
        student.setTenthPercent(request.getTenthPercent());
        student.setTwelfthPercent(request.getTwelfthPercent());
        student.setDiplomaCgpa(request.getDiplomaCgpa());
        student.setSem1Sgpa(request.getSem1Sgpa());
        student.setSem2Sgpa(request.getSem2Sgpa());
        student.setSem3Sgpa(request.getSem3Sgpa());
        student.setSem4Sgpa(request.getSem4Sgpa());
        student.setSem5Sgpa(request.getSem5Sgpa());
        student.setSem6Sgpa(request.getSem6Sgpa());
        student.setCgpa(request.getCgpa());
        student.setCurrentBacklogs(request.getCurrentBacklogs());
        student.setDeadBacklogs(request.getDeadBacklogs());

        // Update Socials
        student.setPortfolio(request.getPortfolio());
        student.setGithub(request.getGithub());
        student.setLinkedin(request.getLinkedin());
        student.setLeetcode(request.getLeetcode());
        student.setCodechef(request.getCodechef());
        student.setCodeforces(request.getCodeforces());

        student = studentRepository.save(student);

        // Update Skills (Replacing all for simplicity, or we can update by id)
        // Since we don't have bidirectional Cascade ALL mapped completely, we'll manually manage them.
        // Actually, it's safer to delete existing and insert new if we want a complete replace.
        // But let's assume we just delete all skills and projects by student id and insert new.
        // First we need deleteByStudentId in repositories. Let's do it manually.
        
        // Let's assume we can fetch them and delete them.
        List<com.sumanth.placementportal.entity.StudentSkill> existingSkills = studentSkillRepository.findAll().stream()
                .filter(s -> s.getStudent().getId().equals(studentId))
                .toList();
        studentSkillRepository.deleteAll(existingSkills);

        if (request.getSkills() != null) {
            for (com.sumanth.placementportal.dto.StudentSkillDTO skillDto : request.getSkills()) {
                com.sumanth.placementportal.entity.StudentSkill skill = com.sumanth.placementportal.entity.StudentSkill.builder()
                        .student(student)
                        .skillName(skillDto.getSkillName())
                        .proficiency(skillDto.getProficiency())
                        .build();
                studentSkillRepository.save(skill);
            }
        }

        // Update Projects
        List<com.sumanth.placementportal.entity.StudentProject> existingProjects = studentProjectRepository.findAll().stream()
                .filter(p -> p.getStudent().getId().equals(studentId))
                .toList();
        studentProjectRepository.deleteAll(existingProjects);

        if (request.getProjects() != null) {
            for (com.sumanth.placementportal.dto.StudentProjectDTO projectDto : request.getProjects()) {
                com.sumanth.placementportal.entity.StudentProject project = com.sumanth.placementportal.entity.StudentProject.builder()
                        .student(student)
                        .title(projectDto.getTitle())
                        .description(projectDto.getDescription())
                        .technologiesUsed(projectDto.getTechnologiesUsed())
                        .projectLink(projectDto.getProjectLink())
                        .build();
                studentProjectRepository.save(project);
            }
        }

        // We can also calculate profile completion percentage here
        student.setProfileCompletionPercentage(calculateCompletionPercentage(student));
        return studentRepository.save(student);
    }
    
    private Integer calculateCompletionPercentage(Student student) {
        int score = 0;
        int maxScore = 50; // Arbitrary weights
        
        if (student.getFirstName() != null) score += 5;
        if (student.getBranch() != null) score += 10;
        if (student.getCgpa() != null) score += 10;
        if (student.getTenthPercent() != null) score += 5;
        if (student.getTwelfthPercent() != null || student.getDiplomaCgpa() != null) score += 5;
        if (student.getLinkedin() != null) score += 5;
        if (student.getGithub() != null) score += 10;
        
        return Math.min(100, (int)((score / (double) maxScore) * 100));
    }

    public void unlockProfile(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        student.setProfileLocked(false);
        studentRepository.save(student);
    }

    public void lockProfile(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        student.setProfileLocked(true);
        studentRepository.save(student);
    }
}