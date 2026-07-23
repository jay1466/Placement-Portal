package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Company;
import com.sumanth.placementportal.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    // Get all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Add new company
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    // Get company by ID
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    // Update company
    public Company updateCompany(Long id, Company updatedCompany) {

        Company company = companyRepository.findById(id).orElse(null);

        if (company != null) {
            company.setCompanyName(updatedCompany.getCompanyName());
            company.setLocation(updatedCompany.getLocation());
            company.setJobRole(updatedCompany.getJobRole());
            company.setPackageLpa(updatedCompany.getPackageLpa());
            company.setEligibilityCgpa(updatedCompany.getEligibilityCgpa());

            return companyRepository.save(company);
        }

        return null;
    }

    // Delete company
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
}