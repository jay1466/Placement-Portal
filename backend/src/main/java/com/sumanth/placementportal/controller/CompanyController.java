package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Company;
import com.sumanth.placementportal.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Get all companies
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // Get company by ID
    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    // Add new company
    @PostMapping
    public Company addCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    // Update company
    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id,
                                 @RequestBody Company company) {
        return companyService.updateCompany(id, company);
    }

    // Delete company
    @DeleteMapping("/{id}")
    public String deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return "Company deleted successfully!";
    }
}