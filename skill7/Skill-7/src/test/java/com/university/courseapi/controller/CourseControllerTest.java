package com.university.courseapi.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createCourseShouldReturnCreated() throws Exception {
        String body = """
                {
                  "courseId": 1,
                  "title": "Spring Boot",
                  "duration": "8 Weeks",
                  "fee": 12000
                }
                """;

        mockMvc.perform(post("/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void createCourseWithInvalidBodyShouldReturnBadRequest() throws Exception {
        String body = """
                {
                  "courseId": 2,
                  "title": "",
                  "duration": "6 Weeks",
                  "fee": 10000
                }
                """;

        mockMvc.perform(post("/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void updateMissingCourseShouldReturnNotFound() throws Exception {
        String body = """
                {
                  "title": "Updated Java",
                  "duration": "10 Weeks",
                  "fee": 13000
                }
                """;

        mockMvc.perform(put("/courses/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void deleteMissingCourseShouldReturnNotFound() throws Exception {
        mockMvc.perform(delete("/courses/777"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false));
    }
}
