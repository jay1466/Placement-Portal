package com.sumanth.placementportal.dto;

import lombok.Data;

@Data
public class CreateRecruiterRequest {
    private String hrName;
    private String companyName;
    private String email;
}
