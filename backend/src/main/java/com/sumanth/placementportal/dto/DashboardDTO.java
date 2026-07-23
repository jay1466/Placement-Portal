package com.sumanth.placementportal.dto;

public class DashboardDTO {

    private long totalStudents;
    private long totalCompanies;
    private long totalDrives;
    private long totalApplications;

    public DashboardDTO() {
    }

    public DashboardDTO(long totalStudents,
                        long totalCompanies,
                        long totalDrives,
                        long totalApplications) {
        this.totalStudents = totalStudents;
        this.totalCompanies = totalCompanies;
        this.totalDrives = totalDrives;
        this.totalApplications = totalApplications;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public long getTotalCompanies() {
        return totalCompanies;
    }

    public void setTotalCompanies(long totalCompanies) {
        this.totalCompanies = totalCompanies;
    }

    public long getTotalDrives() {
        return totalDrives;
    }

    public void setTotalDrives(long totalDrives) {
        this.totalDrives = totalDrives;
    }

    public long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }
}