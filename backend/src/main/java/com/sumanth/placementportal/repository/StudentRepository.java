package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<Student,Long> {

}