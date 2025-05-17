package com.backend.FireFlyBackend.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;
@RestController
@RequestMapping("api")
public class APIController {
    @PostMapping("chat")
    public Mono<Map<String,Object>> fireflyChat(@RequestBody String userMessage){

    }
}
