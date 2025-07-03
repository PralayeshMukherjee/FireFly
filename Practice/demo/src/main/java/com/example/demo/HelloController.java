package com.example.demo;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String helloLogin(){
        return "hello";
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public String userLogin(){
        return "hello, User";
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminLogin(){
        return "hello, Admin";
    }
}
