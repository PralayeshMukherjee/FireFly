package com.backend.FireFlyBackend.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;

import java.util.Map;

public class APIController {
    public Mono<Map<String,Object>> fireflyChat(@RequestBody String userMessage){

    }
}
