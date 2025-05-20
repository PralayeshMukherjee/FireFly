package com.backend.FireFlyBackend.Service;

import com.backend.FireFlyBackend.repository.UserDataRepo;
import com.backend.FireFlyBackend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final UserRepository userRepository;
    private final UserDataRepo userDataRepo;
}
