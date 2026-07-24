package com.sumanth.placementportal.service;

import com.sumanth.placementportal.dto.CreateRecruiterRequest;
import com.sumanth.placementportal.entity.*;
import com.sumanth.placementportal.repository.CompanyRepository;
import com.sumanth.placementportal.repository.RecruiterRepository;
import com.sumanth.placementportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public Recruiter createRecruiter(CreateRecruiterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Generate temporary password
        String tempPassword = UUID.randomUUID().toString().substring(0, 8);

        // 1. Create User
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(tempPassword))
                .role(Role.RECRUITER)
                .forcePasswordReset(true)
                .isEmailVerified(true)
                .isActive(true)
                .build();
        user = userRepository.save(user);

        // 2. Create Company Shell
        Company company = Company.builder()
                .companyName(request.getCompanyName())
                .status(CompanyStatus.PENDING_VERIFICATION)
                .build();
        company = companyRepository.save(company);

        // 3. Create Recruiter Profile
        Recruiter recruiter = Recruiter.builder()
                .user(user)
                .company(company)
                .hrName(request.getHrName())
                .isFirstLogin(true)
                .build();
        recruiter = recruiterRepository.save(recruiter);

        // 4. Send Email
        sendTempPasswordEmail(request.getEmail(), tempPassword);

        return recruiter;
    }

    private void sendTempPasswordEmail(String email, String tempPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Welcome to Placement Portal - Recruiter Account");
        message.setText("Your recruiter account has been created by the Admin.\n\n" +
                "Email: " + email + "\n" +
                "Temporary Password: " + tempPassword + "\n\n" +
                "Please log in and you will be forced to change your password immediately.");
        mailSender.send(message);
    }
}
