package com.employeemanagement.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.employeemanagement.security.AuthenticationBean;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class BasicAuthenticationController {
    @GetMapping(path = "/basicauth")
    public AuthenticationBean authenticationBean() {
        return new AuthenticationBean("You are authenticated");
    }
}
