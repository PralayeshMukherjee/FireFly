package com.backend.FireFlyBackend.Controller;


import com.backend.FireFlyBackend.DTO.AddUser;
import com.backend.FireFlyBackend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/registration")
    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){
        String name = addUser.getName().trim();
        String emailId = addUser.getEmailId().trim();
        String password = addUser.getPassword().trim();
        boolean isGenrated = userService.generateOTP(emailId);
        boolean isSend = false;
        if(isGenrated){
            isSend = userService.sendOTPToEmail(name,emailId);
        }
        return Map.of("isSend",isSend);
    }
    @PostMapping("/verifyOtp")
    public Map<String,Boolean> verifyTheOTP(@RequestParam String otp,String emailId, String name){
        boolean isVerified = userService.verifyOTP(emailId,otp);
        return Map.of("isVerfied",isVerified);
    }
}
