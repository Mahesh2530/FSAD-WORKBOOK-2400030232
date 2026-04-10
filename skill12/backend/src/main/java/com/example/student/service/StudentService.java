
package com.example.student.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.student.repository.StudentRepository;
import com.example.student.model.Student;

@Service
public class StudentService {

@Autowired
private StudentRepository repo;

public List<Student> getAll(){
return repo.findAll();
}

public Student save(Student s){
return repo.save(s);
}

public Student update(Long id,Student s){
s.setId(id);
return repo.save(s);
}

public void delete(Long id){
repo.deleteById(id);
}

}
