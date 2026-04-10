package com.university.courseapi.model;

public class Course {

    private Long courseId;
    private String title;
    private String duration;
    private Double fee;

    public Course() {
    }

    public Course(Long courseId, String title, String duration, Double fee) {
        this.courseId = courseId;
        this.title = title;
        this.duration = duration;
        this.fee = fee;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }
}
