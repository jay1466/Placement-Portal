package com.sumanth.placementportal.repository;

import com.sumanth.placementportal.entity.CompanyPendingChange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyPendingChangeRepository extends JpaRepository<CompanyPendingChange, Long> {
    List<CompanyPendingChange> findByCompanyId(Long companyId);
}
