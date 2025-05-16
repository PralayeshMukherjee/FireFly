package com.backend.FireFlyBackend.Controller;


import com.backend.FireFlyBackend.DTO.AddUser;
import com.backend.FireFlyBackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){
        String name = addUser.getName().trim();
        String emailId = addUser.getEmailId().trim();
        String password = addUser.getPassword().trim();
        userService.generateOTP(emailId);
    }
}
