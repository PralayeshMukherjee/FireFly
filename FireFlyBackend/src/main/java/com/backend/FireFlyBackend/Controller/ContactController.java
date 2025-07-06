package com.backend.FireFlyBackend.Controller;

import com.backend.FireFlyBackend.DTO.ContactDTO;
import com.backend.FireFlyBackend.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private ContactService contactService;
    @PostMapping("/team")
    public Map<String, Boolean> sendMail(@RequestBody ContactDTO contactHolder){
        String name = contactHolder.getName();
        String email = contactHolder.getEmail();
        String message = contactHolder.getMessage();
        boolean isContactMailSend = contactService.sendMailToContact("",name,email,message);
        return Map.of("isContactMailSend",isContactMailSend);
    }
}
