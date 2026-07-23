package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}