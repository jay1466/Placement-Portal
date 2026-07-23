package com.sumanth.placementportal.dto;

public class CompanyMatchResponse {

    private Long companyId;

    private String companyName;

    private Integer matchPercentage;

    public CompanyMatchResponse() {
    }

    public CompanyMatchResponse(Long companyId,
                                String companyName,
                                Integer matchPercentage) {

        this.companyId = companyId;
        this.companyName = companyName;
        this.matchPercentage = matchPercentage;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Integer getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Integer matchPercentage) {
        this.matchPercentage = matchPercentage;
    }
}