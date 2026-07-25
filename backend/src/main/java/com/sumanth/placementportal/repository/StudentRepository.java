package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sumanth.placementportal.entity.User;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Long> {
    Optional<Student> findByUser(User user);

}