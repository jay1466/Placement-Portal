package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentProfileService {

    @Autowired
    private StudentRepository studentRepository;

    public Student getProfile(Long id) {

        return studentRepository.findById(id).orElse(null);

    }

    public Student updateProfile(Long id, Student updatedStudent) {

        Student student =
                studentRepository.findById(id).orElse(null);

        if(student == null){
            return null;
        }

        student.setName(updatedStudent.getName());

        student.setEmail(updatedStudent.getEmail());

        student.setPhone(updatedStudent.getPhone());

        student.setBranch(updatedStudent.getBranch());

        student.setCgpa(updatedStudent.getCgpa());

        student.setGraduationYear(
                updatedStudent.getGraduationYear()
        );

        return studentRepository.save(student);

    }

}