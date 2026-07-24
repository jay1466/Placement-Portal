package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.OtpVerification;
import com.sumanth.placementportal.repository.OtpVerificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private OtpVerificationRepository otpRepository;

    @Autowired
    private EmailService emailService;

    public void generateAndSendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        
        OtpVerification verification = OtpVerification.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .isUsed(false)
                .build();
                
        otpRepository.save(verification);
        emailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerification> verificationOpt = otpRepository.findByEmailAndOtp(email, otp);
        
        if (verificationOpt.isPresent()) {
            OtpVerification verification = verificationOpt.get();
            if (!verification.isUsed() && verification.getExpiryTime().isAfter(LocalDateTime.now())) {
                verification.setUsed(true);
                otpRepository.save(verification);
                return true;
            }
        }
        return false;
    }
}
