package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findTopByStudentIdOrderByIdDesc(Long studentId);

}