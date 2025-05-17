package com.backend.FireFlyBackend.Service;

import com.backend.FireFlyBackend.entity.UserEntity;
import com.backend.FireFlyBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;

public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        Optional<UserEntity> ue = userRepository.findById(email);
        if(ue.isEmpty()){
            UserEntity userEntity = new UserEntity();
            userEntity.setName(name);
            userEntity.setEmailId(email);
            userEntity.setEmailId("GOOGLE_AUTH");

            userRepository.save(userEntity);
        }
        return  oAuth2User;
    }
}
