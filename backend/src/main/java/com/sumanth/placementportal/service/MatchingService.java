package com.sumanth.placementportal.service;

import org.springframework.stereotype.Service;

@Service
public class MatchingService {

    public int calculateMatch(String resumeText, String companySkills) {

        if (resumeText == null || companySkills == null) {
            return 0;
        }

        resumeText = resumeText.toLowerCase();

        String[] skills = companySkills.toLowerCase().split(",");

        int matched = 0;

        for (String skill : skills) {

            if (resumeText.contains(skill.trim())) {
                matched++;
            }

        }

        return (matched * 100) / skills.length;
    }

}