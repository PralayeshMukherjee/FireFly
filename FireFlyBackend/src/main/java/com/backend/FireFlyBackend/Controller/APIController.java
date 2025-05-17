package com.backend.FireFlyBackend.Controller;

import com.backend.FireFlyBackend.DTO.ChatRequest;
import com.backend.FireFlyBackend.Service.GeminiAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
@RestController
@RequestMapping("/api")
public class APIController {

    @Autowired
    private GeminiAPI geminiAPI;

    @PostMapping("/chat")
    public Mono<Map<String,Object>> fireflyChat(@RequestBody ChatRequest chatRequest){
        String userMessage = chatRequest.getUserMessage();
        System.out.println(userMessage);
        return geminiAPI.chat(userMessage);
    }
}
