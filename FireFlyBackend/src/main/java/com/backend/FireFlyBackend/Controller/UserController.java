package com.backend.FireFlyBackend.Controller;


import com.backend.FireFlyBackend.DTO.AddUser;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){

    }
}
