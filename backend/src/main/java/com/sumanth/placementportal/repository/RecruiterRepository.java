package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.Recruiter;
import com.sumanth.placementportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {

    Optional<Recruiter> findByUser(User user);

    Optional<Recruiter> findByCompanyName(String companyName);

}