package com.backend.FireFlyBackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiAPI {
    @Value("${gemini.api.key}")
    private String apiKey;
}
