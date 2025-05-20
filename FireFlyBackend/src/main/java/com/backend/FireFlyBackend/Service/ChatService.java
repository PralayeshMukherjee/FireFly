package com.backend.FireFlyBackend.Service;

import com.backend.FireFlyBackend.entity.UserData;
import com.backend.FireFlyBackend.entity.UserEntity;
import com.backend.FireFlyBackend.repository.UserDataRepo;
import com.backend.FireFlyBackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatService {
    private final UserRepository userRepository;
    private final UserDataRepo userDataRepo;

    public ChatService(UserRepository userRepository,UserDataRepo userDataRepo){
        this.userRepository = userRepository;
        this.userDataRepo = userDataRepo;
    }
    public void saveUserMessage(String email, String message){
        Optional<UserEntity> uE = userRepository.findById(email);
        if(uE.isPresent()){
            UserData userData = new UserData();
            userData.setMessage(message);
            userData.setEmail(email);
            userDataRepo.save(userData);
        }else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }
}
