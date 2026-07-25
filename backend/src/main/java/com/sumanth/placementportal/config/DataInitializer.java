package com.sumanth.placementportal.config;

import com.sumanth.placementportal.entity.Role;
import com.sumanth.placementportal.entity.User;
import com.sumanth.placementportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        Optional<User> admin = userRepository.findByEmail("admin@placementportal.com");
        if (admin.isEmpty()) {
            User newAdmin = User.builder()
                    .email("admin@placementportal.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ADMIN)
                    .isActive(true)
                    .build();
            userRepository.save(newAdmin);
            System.out.println("Default Admin user created: admin@placementportal.com / Admin@123");
        } else {
            User existingAdmin = admin.get();
            if (!existingAdmin.isActive()) {
                existingAdmin.setActive(true);
                userRepository.save(existingAdmin);
                System.out.println("Admin user activated.");
            }
        }
    }
}
