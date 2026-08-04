package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.dto.LoginRequest;
import com.sumanth.placementportal.dto.ResetPasswordRequest;
import com.sumanth.placementportal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(request);
            return ResponseEntity.ok("Password reset successfully. You can now login normally.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Direct student registration (no OTP required).
     * Accepts: { email, password, username, branch, cgpa, phone, graduationYear }
     */
    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@RequestBody java.util.Map<String, Object> body) {
        try {
            String email    = (String) body.get("email");
            String password = (String) body.get("password");
            String username = (String) body.getOrDefault("username", "");
            String branch   = (String) body.getOrDefault("branch", "");
            String phone    = (String) body.getOrDefault("phone", "");

            Double cgpa = null;
            Object cgpaVal = body.get("cgpa");
            if (cgpaVal != null && !cgpaVal.toString().isBlank()) {
                cgpa = Double.parseDouble(cgpaVal.toString());
            }

            Integer graduationYear = null;
            Object gyVal = body.get("graduationYear");
            if (gyVal != null && !gyVal.toString().isBlank()) {
                graduationYear = Integer.parseInt(gyVal.toString());
            }

            authService.registerStudentDirect(email, password, username, branch, phone, cgpa, graduationYear);
            return ResponseEntity.ok("Student registered successfully. You can now login.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Step 1 of OTP flow – request OTP */
    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@RequestParam String email) {
        try {
            authService.requestStudentRegistration(email);
            return ResponseEntity.ok("OTP sent to " + email);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /** Step 2 of OTP flow – verify OTP and create account */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email,
                                        @RequestParam String otp,
                                        @RequestParam String password) {
        try {
            authService.verifyStudentRegistration(email, otp, password);
            return ResponseEntity.ok("Account verified and created successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}