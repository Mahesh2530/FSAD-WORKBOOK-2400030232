package com.university.courseapi.controller;

import com.university.courseapi.model.Course;
import com.university.courseapi.payload.ApiResponse;
import com.university.courseapi.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Course>> createCourse(@RequestBody Course course) {
        try {
            Course created = courseService.createCourse(course);
            ApiResponse<Course> response = new ApiResponse<>(true, "Course created successfully.", created);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException ex) {
            return badRequest(ex.getMessage());
        }
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<ApiResponse<Course>> updateCourse(@PathVariable Long courseId, @RequestBody Course course) {
        try {
            Optional<Course> updated = courseService.updateCourse(courseId, course);
            if (updated.isEmpty()) {
                ApiResponse<Course> response = new ApiResponse<>(false, "Course not found.", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            ApiResponse<Course> response = new ApiResponse<>(true, "Course updated successfully.", updated.get());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return badRequest(ex.getMessage());
        }
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<ApiResponse<Object>> deleteCourse(@PathVariable Long courseId) {
        try {
            boolean deleted = courseService.deleteCourse(courseId);
            if (!deleted) {
                ApiResponse<Object> response = new ApiResponse<>(false, "Course not found.", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            ApiResponse<Object> response = new ApiResponse<>(true, "Course deleted successfully.", null);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return badRequest(ex.getMessage());
        }
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<ApiResponse<Course>> getCourseById(@PathVariable Long courseId) {
        try {
            Optional<Course> course = courseService.getCourseById(courseId);
            if (course.isEmpty()) {
                ApiResponse<Course> response = new ApiResponse<>(false, "Course not found.", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            ApiResponse<Course> response = new ApiResponse<>(true, "Course fetched successfully.", course.get());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return badRequest(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Course>>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        ApiResponse<List<Course>> response = new ApiResponse<>(true, "Courses fetched successfully.", courses);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<ApiResponse<List<Course>>> searchCoursesByTitle(@PathVariable String title) {
        try {
            List<Course> courses = courseService.searchCoursesByTitle(title);
            ApiResponse<List<Course>> response = new ApiResponse<>(true, "Search completed successfully.", courses);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return badRequest(ex.getMessage());
        }
    }

    private <T> ResponseEntity<ApiResponse<T>> badRequest(String message) {
        ApiResponse<T> response = new ApiResponse<>(false, message, null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
