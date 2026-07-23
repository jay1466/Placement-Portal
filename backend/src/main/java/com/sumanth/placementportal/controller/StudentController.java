package com.sumanth.placementportal.controller;

import com.sumanth.placementportal.entity.Student;
import com.sumanth.placementportal.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://placement-portal-cyan-tau.vercel.app"
})
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // Register a new student
    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {

        System.out.println("===== REGISTER API HIT =====");
        System.out.println(student.getName());

        return studentService.saveStudent(student);
    }

    // Get student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student Deleted Successfully";
    }
}