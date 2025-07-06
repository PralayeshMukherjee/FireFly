package com.backend.FireFlyBackend.Controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class RedirectController {
    @GetMapping("/redirect")
    public void redirectAfterLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("https://fire-fly-theta.vercel.app/chatbot?login=success");
    }

}
