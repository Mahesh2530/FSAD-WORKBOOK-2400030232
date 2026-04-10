package com.university.studentapi.service;

import com.university.studentapi.model.Student;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class StudentService {

    private final Map<Long, Student> studentStore = new HashMap<>();

    public StudentService() {
        studentStore.put(1L, new Student(1L, "Arjun Reddy", "Computer Science"));
        studentStore.put(2L, new Student(2L, "Meera Rao", "Electronics"));
        studentStore.put(3L, new Student(3L, "Rahul Varma", "Mechanical"));
    }

    public Optional<Student> findById(Long id) {
        return Optional.ofNullable(studentStore.get(id));
    }
}
