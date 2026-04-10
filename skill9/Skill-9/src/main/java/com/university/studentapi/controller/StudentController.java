package com.university.studentapi.controller;

import com.university.studentapi.exception.InvalidInputException;
import com.university.studentapi.exception.StudentNotFoundException;
import com.university.studentapi.model.Student;
import com.university.studentapi.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        long parsedId;
        try {
            parsedId = Long.parseLong(id);
        } catch (NumberFormatException ex) {
            throw new InvalidInputException("Invalid student ID format. ID must be a number.");
        }

        if (parsedId <= 0) {
            throw new InvalidInputException("Invalid student ID. ID must be greater than zero.");
        }

        Student student = studentService.findById(parsedId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found for ID: " + parsedId));

        return ResponseEntity.ok(student);
    }
}
