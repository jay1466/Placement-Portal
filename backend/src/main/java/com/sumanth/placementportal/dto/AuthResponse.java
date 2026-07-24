package com.sumanth.placementportal.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private boolean forcePasswordReset;
}
