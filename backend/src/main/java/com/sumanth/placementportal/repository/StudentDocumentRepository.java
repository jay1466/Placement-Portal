package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.StudentDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentDocumentRepository extends JpaRepository<StudentDocument, Long> {
    Optional<StudentDocument> findByStudentId(Long studentId);
}
