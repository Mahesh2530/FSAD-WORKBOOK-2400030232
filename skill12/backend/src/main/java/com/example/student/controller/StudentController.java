
package com.example.student.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.student.model.Student;
import com.example.student.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins="http://localhost:5173")
public class StudentController {

@Autowired
private StudentService service;

@PostMapping
public ResponseEntity<Student> addStudent(@RequestBody Student s){
return ResponseEntity.ok(service.save(s));
}

@GetMapping
public ResponseEntity<List<Student>> getStudents(){
return ResponseEntity.ok(service.getAll());
}

@PutMapping("/{id}")
public ResponseEntity<Student> update(@PathVariable Long id,@RequestBody Student s){
return ResponseEntity.ok(service.update(id,s));
}

@DeleteMapping("/{id}")
public ResponseEntity<String> delete(@PathVariable Long id){
service.delete(id);
return ResponseEntity.ok("Deleted");
}

}
