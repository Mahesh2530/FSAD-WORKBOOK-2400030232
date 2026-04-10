package com.university.courseapi.service.impl;

import com.university.courseapi.model.Course;
import com.university.courseapi.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class CourseServiceImpl implements CourseService {

    private final ConcurrentMap<Long, Course> courseStore = new ConcurrentHashMap<>();

    @Override
    public Course createCourse(Course course) {
        validateCourse(course, true);
        if (courseStore.containsKey(course.getCourseId())) {
            throw new IllegalArgumentException("Course with given courseId already exists.");
        }
        courseStore.put(course.getCourseId(), course);
        return course;
    }

    @Override
    public Optional<Course> updateCourse(Long courseId, Course course) {
        if (courseId == null || courseId <= 0) {
            throw new IllegalArgumentException("courseId must be a positive number.");
        }
        validateCourse(course, false);
        if (!courseStore.containsKey(courseId)) {
            return Optional.empty();
        }

        Course existing = courseStore.get(courseId);
        existing.setTitle(course.getTitle());
        existing.setDuration(course.getDuration());
        existing.setFee(course.getFee());
        courseStore.put(courseId, existing);
        return Optional.of(existing);
    }

    @Override
    public boolean deleteCourse(Long courseId) {
        if (courseId == null || courseId <= 0) {
            throw new IllegalArgumentException("courseId must be a positive number.");
        }
        return courseStore.remove(courseId) != null;
    }

    @Override
    public Optional<Course> getCourseById(Long courseId) {
        if (courseId == null || courseId <= 0) {
            throw new IllegalArgumentException("courseId must be a positive number.");
        }
        return Optional.ofNullable(courseStore.get(courseId));
    }

    @Override
    public List<Course> getAllCourses() {
        return new ArrayList<>(courseStore.values());
    }

    @Override
    public List<Course> searchCoursesByTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("title must not be blank.");
        }

        String normalized = title.trim().toLowerCase();
        return courseStore.values().stream()
                .filter(course -> course.getTitle() != null
                        && course.getTitle().toLowerCase().contains(normalized))
                .toList();
    }

    private void validateCourse(Course course, boolean validateId) {
        if (course == null) {
            throw new IllegalArgumentException("Course request body is required.");
        }
        if (validateId && (course.getCourseId() == null || course.getCourseId() <= 0)) {
            throw new IllegalArgumentException("courseId must be a positive number.");
        }
        if (course.getTitle() == null || course.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("title must not be blank.");
        }
        if (course.getDuration() == null || course.getDuration().trim().isEmpty()) {
            throw new IllegalArgumentException("duration must not be blank.");
        }
        if (course.getFee() == null || course.getFee() < 0) {
            throw new IllegalArgumentException("fee must be zero or greater.");
        }
    }
}
