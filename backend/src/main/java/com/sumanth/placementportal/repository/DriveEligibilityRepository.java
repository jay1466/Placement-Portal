package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.DriveEligibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriveEligibilityRepository extends JpaRepository<DriveEligibility, Long> {
}
