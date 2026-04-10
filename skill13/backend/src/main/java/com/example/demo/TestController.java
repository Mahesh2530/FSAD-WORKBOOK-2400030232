
package com.example.demo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping
    public String test() {
        return "Backend Connected Successfully!";
    }
}
