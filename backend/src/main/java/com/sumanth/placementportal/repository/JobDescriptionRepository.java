package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobDescriptionRepository
        extends JpaRepository<JobDescription, Long> {
}