package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Company;
import com.sumanth.placementportal.entity.CompanyPendingChange;
import com.sumanth.placementportal.entity.CompanyStatus;
import com.sumanth.placementportal.repository.CompanyRepository;
import com.sumanth.placementportal.repository.CompanyPendingChangeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyPendingChangeRepository pendingChangeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    public void submitCompanyUpdate(Long companyId, String jsonChanges) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
                
        CompanyPendingChange change = CompanyPendingChange.builder()
                .company(company)
                .proposedChangesJson(jsonChanges)
                .status(CompanyStatus.PENDING_VERIFICATION)
                .build();
                
        pendingChangeRepository.save(change);
    }

    public List<CompanyPendingChange> getPendingUpdates() {
        // Need to query by PENDING_VERIFICATION. For now we will return all that are PENDING.
        return pendingChangeRepository.findAll().stream()
                .filter(c -> c.getStatus() == CompanyStatus.PENDING_VERIFICATION)
                .toList();
    }

    public void approveUpdate(Long updateId) {
        CompanyPendingChange change = pendingChangeRepository.findById(updateId)
                .orElseThrow(() -> new IllegalArgumentException("Update request not found"));
                
        Company company = change.getCompany();
        
        try {
            // Merge JSON into Company object
            objectMapper.readerForUpdating(company).readValue(change.getProposedChangesJson());
            
            // Mark company as approved
            company.setStatus(CompanyStatus.APPROVED);
            companyRepository.save(company);
            
            // Mark change as resolved
            change.setStatus(CompanyStatus.APPROVED);
            change.setResolvedAt(java.time.LocalDateTime.now());
            pendingChangeRepository.save(change);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to apply JSON changes: " + e.getMessage());
        }
    }

    public void rejectUpdate(Long updateId) {
        CompanyPendingChange change = pendingChangeRepository.findById(updateId)
                .orElseThrow(() -> new IllegalArgumentException("Update request not found"));
                
        change.setStatus(CompanyStatus.REJECTED);
        change.setResolvedAt(java.time.LocalDateTime.now());
        pendingChangeRepository.save(change);
    }
}