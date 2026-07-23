package com.sumanth.placementportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recruiters")
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String phone;

    private String website;

    private String location;

    private String designation;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Recruiter() {
    }

    public Recruiter(Long id, String companyName, String phone,
                     String website, String location,
                     String designation, User user) {

        this.id = id;
        this.companyName = companyName;
        this.phone = phone;
        this.website = website;
        this.location = location;
        this.designation = designation;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPhone() {
        return phone;
    }

    public String getWebsite() {
        return website;
    }

    public String getLocation() {
        return location;
    }

    public String getDesignation() {
        return designation;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public void setUser(User user) {
        this.user = user;
    }
}