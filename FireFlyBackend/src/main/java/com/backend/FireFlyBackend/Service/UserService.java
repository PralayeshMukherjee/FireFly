package com.backend.FireFlyBackend.Service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private static final int otpLenght = 6;
    private Map<String,String > otpMapping = new HashMap<>();
}
