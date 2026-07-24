package com.sumanth.placementportal.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class EligibilityResult {
    private boolean isEligible;
    private Map<String, String> criteriaStatus; 
    // e.g., {"Branch": "PASS", "CGPA": "FAIL (Required 7.0, Has 6.5)", "Current Backlogs": "PASS"}
}
