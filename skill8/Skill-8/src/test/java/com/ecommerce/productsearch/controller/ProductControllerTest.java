package com.ecommerce.productsearch.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void categoryEndpointShouldReturnOk() throws Exception {
        mockMvc.perform(get("/products/category/Electronics"))
                .andExpect(status().isOk());
    }

    @Test
    void filterEndpointWithInvalidRangeShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/products/filter?min=1000&max=100"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void sortedEndpointShouldReturnOk() throws Exception {
        mockMvc.perform(get("/products/sorted"))
                .andExpect(status().isOk());
    }
}
