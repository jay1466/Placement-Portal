package com.sumanth.placementportal.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Map;

@Data
@Builder
public class DashboardMetricsDTO {
    private long totalStudents;
    private long totalCompanies;
    private long totalPlacementDrives;
    private long totalPlacedStudents;
    private Map<String, Long> branchWisePlacements;
}
