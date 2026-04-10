package com.klu;

import org.springframework.stereotype.Component;

@Component
public class Course {
    private final int id = 301;
    private final String course = "Spring Core";
    private final String dateOfCompletion = "25-Jan-2026";

    @Override
    public String toString() {
        return "Course [id=" + id + ", course=" + course + ", dateOfCompletion=" + dateOfCompletion + "]";
    }
}
