package com.sumanth.placementportal.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // TODO: Refactor entirely in Phase 1 (OTP logic) and Phase 2 (Admin flows)
    @PostMapping("/login")
    public ResponseEntity<?> login() {
        throw new UnsupportedOperationException("Phase 1 refactoring");
    }
}