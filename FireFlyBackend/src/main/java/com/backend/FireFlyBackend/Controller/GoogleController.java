package com.backend.FireFlyBackend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/check")
public class GoogleController {
    @GetMapping("/login")
    public ResponseEntity<?> getUser(OAuth2AuthenticationToken auth) {
        if (auth == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        Map<String, Object> attributes = auth.getPrincipal().getAttributes();

        Map<String, Object> userData = new HashMap<>();
        userData.put("email", attributes.get("email"));
        userData.put("name", attributes.get("name"));
        userData.put("picture", attributes.get("picture"));
        userData.put("isGoogleUser", true);

        return ResponseEntity.ok(userData);
    }

}
