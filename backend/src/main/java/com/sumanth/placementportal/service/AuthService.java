package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Role;
import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.entity.User;
import com.sumanth.placementportal.repository.StudentRepository;
import com.sumanth.placementportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private com.sumanth.placementportal.repository.RecruiterRepository recruiterRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private OtpService otpService;

    public void requestStudentRegistration(String email) {
        if (!email.endsWith("@adit.ac.in")) {
            throw new IllegalArgumentException("Only @adit.ac.in emails are allowed for student registration.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered.");
        }
        otpService.generateAndSendOtp(email);
    }

    public void verifyStudentRegistration(String email, String otp, String password) {
        if (!otpService.verifyOtp(email, otp)) {
            throw new IllegalArgumentException("Invalid or expired OTP");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.STUDENT)
                .isEmailVerified(true)
                .isActive(true)
                .build();
                
        user = userRepository.save(user);
        
        // Extract enrollment no from email (e.g. 1234567890@adit.ac.in -> 1234567890)
        String enrollmentNo = email.substring(0, email.indexOf("@"));
        
        Student student = Student.builder()
                .user(user)
                .enrollmentNo(enrollmentNo)
                .isProfileLocked(false)
                .profileCompletionPercentage(0)
                .build();
                
        studentRepository.save(student);
    }

    public com.sumanth.placementportal.dto.AuthResponse login(com.sumanth.placementportal.dto.LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!user.isActive()) {
            throw new IllegalArgumentException("Account is disabled");
        }

        Long entityId = user.getId();
        Long companyId = null;
        if (user.getRole() == Role.STUDENT) {
            entityId = studentRepository.findByUser(user).map(Student::getId).orElse(user.getId());
        } else if (user.getRole() == Role.RECRUITER) {
            java.util.Optional<com.sumanth.placementportal.entity.Recruiter> rec = recruiterRepository.findByUser(user);
            entityId = rec.map(com.sumanth.placementportal.entity.Recruiter::getId).orElse(user.getId());
            if (rec.isPresent() && rec.get().getCompany() != null) {
                companyId = rec.get().getCompany().getId();
            }
        }

        // Generate dummy token for now, in a real app this would be a JWT
        String token = "dummy-jwt-token-" + user.getId();

        return com.sumanth.placementportal.dto.AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .id(entityId)
                .companyId(companyId)
                .role(user.getRole().name())
                .forcePasswordReset(user.isForcePasswordReset())
                .build();
    }

    public void resetPassword(com.sumanth.placementportal.dto.ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid old password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setForcePasswordReset(false);
        userRepository.save(user);
    }
}
