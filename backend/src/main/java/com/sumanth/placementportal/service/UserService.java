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
        throw new UnsupportedOperationException("Phase 2/3 refactoring");
    }

    public String login(String email, String password) {
        throw new UnsupportedOperationException("Phase 2/3 refactoring");
    }

    public User updateUser(Long id, User updatedUser) {
        throw new UnsupportedOperationException("Phase 2/3 refactoring");
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}