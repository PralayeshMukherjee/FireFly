package com.backend.FireFlyBackend.Controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GoogleController {
    public String googleLogin(OAuth2AuthenticationToken authentication){
        Map<String,Object> map = authentication.getPrincipal().getAttributes();
        return "Hello, "+map.get("name");
    }
}
