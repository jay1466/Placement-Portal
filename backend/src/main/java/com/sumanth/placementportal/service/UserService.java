package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.User;
import com.sumanth.placementportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user != null &&
                passwordEncoder.matches(password, user.getPassword())) {

            return "Login Successful";
        }

        return "Invalid Email or Password";
    }

    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {

            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());

            if (updatedUser.getPassword() != null &&
                    !updatedUser.getPassword().isBlank()) {

                user.setPassword(
                        passwordEncoder.encode(updatedUser.getPassword())
                );
            }
            user.setRole(updatedUser.getRole());

            return userRepository.save(user);
        }

        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}