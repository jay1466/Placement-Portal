package com.sumanth.placementportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Placement Portal - OTP Verification");
        message.setText("Your OTP for registration/login is: " + otp + "\nThis OTP is valid for 10 minutes.");
        mailSender.send(message);
    }
}