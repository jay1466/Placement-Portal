package com.sumanth.placementportal.service;

import com.sumanth.placementportal.dto.EligibilityResult;
import com.sumanth.placementportal.entity.DriveEligibility;
import com.sumanth.placementportal.entity.Student;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Arrays;

@Service
public class EligibilityService {

    public EligibilityResult evaluate(Student student, DriveEligibility eligibility) {
        Map<String, String> statusMap = new LinkedHashMap<>();
        boolean overallEligible = true;

        // 1. Check Branch
        if (eligibility.getEligibleBranches() != null && !eligibility.getEligibleBranches().isEmpty() && student.getBranch() != null) {
            String[] allowedBranches = eligibility.getEligibleBranches().split(",");
            boolean branchMatch = Arrays.stream(allowedBranches)
                    .map(String::trim)
                    .anyMatch(b -> b.equalsIgnoreCase(student.getBranch()));
            
            if (branchMatch) {
                statusMap.put("Branch", "PASS");
            } else {
                statusMap.put("Branch", "FAIL (Required: " + eligibility.getEligibleBranches() + ", Has: " + student.getBranch() + ")");
                overallEligible = false;
            }
        }

        // 2. Check Gender
        if (eligibility.getGender() != null && !eligibility.getGender().equalsIgnoreCase("ANY")) {
            if (eligibility.getGender().equalsIgnoreCase(student.getGender())) {
                statusMap.put("Gender", "PASS");
            } else {
                statusMap.put("Gender", "FAIL (Required: " + eligibility.getGender() + ")");
                overallEligible = false;
            }
        }

        // 3. Check CGPA
        if (eligibility.getMinimumCgpa() != null) {
            double studentCgpa = student.getCgpa() != null ? student.getCgpa() : 0.0;
            if (studentCgpa >= eligibility.getMinimumCgpa()) {
                statusMap.put("CGPA", "PASS");
            } else {
                statusMap.put("CGPA", "FAIL (Required: " + eligibility.getMinimumCgpa() + ", Has: " + studentCgpa + ")");
                overallEligible = false;
            }
        }

        // 4. Check Current Backlogs
        if (eligibility.getMaxCurrentBacklogs() != null) {
            int currentBacklogs = student.getCurrentBacklogs() != null ? student.getCurrentBacklogs() : 0;
            if (currentBacklogs <= eligibility.getMaxCurrentBacklogs()) {
                statusMap.put("Current Backlogs", "PASS");
            } else {
                statusMap.put("Current Backlogs", "FAIL (Max allowed: " + eligibility.getMaxCurrentBacklogs() + ", Has: " + currentBacklogs + ")");
                overallEligible = false;
            }
        }

        // 5. Check Dead Backlogs
        if (eligibility.getMaxDeadBacklogs() != null) {
            int deadBacklogs = student.getDeadBacklogs() != null ? student.getDeadBacklogs() : 0;
            if (deadBacklogs <= eligibility.getMaxDeadBacklogs()) {
                statusMap.put("Dead Backlogs", "PASS");
            } else {
                statusMap.put("Dead Backlogs", "FAIL (Max allowed: " + eligibility.getMaxDeadBacklogs() + ", Has: " + deadBacklogs + ")");
                overallEligible = false;
            }
        }

        // 6. Check 10th Percent
        if (eligibility.getMinimumTenthPercent() != null) {
            double tenth = student.getTenthPercent() != null ? student.getTenthPercent() : 0.0;
            if (tenth >= eligibility.getMinimumTenthPercent()) {
                statusMap.put("10th Percentage", "PASS");
            } else {
                statusMap.put("10th Percentage", "FAIL (Required: " + eligibility.getMinimumTenthPercent() + ", Has: " + tenth + ")");
                overallEligible = false;
            }
        }

        // 7. Check 12th Percent
        if (eligibility.getMinimumTwelfthPercent() != null) {
            double twelfth = student.getTwelfthPercent() != null ? student.getTwelfthPercent() : 0.0;
            if (twelfth >= eligibility.getMinimumTwelfthPercent()) {
                statusMap.put("12th Percentage", "PASS");
            } else {
                statusMap.put("12th Percentage", "FAIL (Required: " + eligibility.getMinimumTwelfthPercent() + ", Has: " + twelfth + ")");
                overallEligible = false;
            }
        }

        // Can expand to SGPA checks here if needed...

        return EligibilityResult.builder()
                .isEligible(overallEligible)
                .criteriaStatus(statusMap)
                .build();
    }
}
