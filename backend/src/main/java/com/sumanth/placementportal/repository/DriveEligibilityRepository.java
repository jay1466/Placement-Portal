package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.DriveEligibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriveEligibilityRepository extends JpaRepository<DriveEligibility, Long> {
    Optional<DriveEligibility> findByPlacementDriveId(Long placementDriveId);
}
