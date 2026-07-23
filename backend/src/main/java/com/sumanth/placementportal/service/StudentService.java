package com.sumanth.placementportal.service;

import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Register a new student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.orElse(null);
    }

    // Update student details
    public Student updateStudent(Long id, Student updatedStudent) {

        Optional<Student> optionalStudent = studentRepository.findById(id);

        if (optionalStudent.isPresent()) {

            Student student = optionalStudent.get();

            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setBranch(updatedStudent.getBranch());
            student.setCgpa(updatedStudent.getCgpa());
            student.setPassword(updatedStudent.getPassword());

            return studentRepository.save(student);
        }

        return null;
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}