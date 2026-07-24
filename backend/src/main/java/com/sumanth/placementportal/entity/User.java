package com.sumanth.placementportal.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email; // Used as username

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "is_email_verified")
    private boolean isEmailVerified = false;

    @Column(name = "is_active")
    private boolean isActive = true;

    @Column(name = "force_password_reset")
    private boolean forcePasswordReset = false;

    // We can map Student or Recruiter here later if needed, but keeping it unidirectional from Student/Recruiter to User is also fine.
}