package com.university.courseapi.service;

import com.university.courseapi.model.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    Course createCourse(Course course);

    Optional<Course> updateCourse(Long courseId, Course course);

    boolean deleteCourse(Long courseId);

    Optional<Course> getCourseById(Long courseId);

    List<Course> getAllCourses();

    List<Course> searchCoursesByTitle(String title);
}
