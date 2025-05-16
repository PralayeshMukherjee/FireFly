package com.backend.FireFlyBackend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors() // ✅ enable CORS
                .and()
                .csrf().disable() // ❗ disable CSRF for development or APIs (not recommended in prod)
                .authorizeHttpRequests()
                .requestMatchers("/user/registration").permitAll() // ✅ allow public access
                .anyRequest().authenticated();

        return http.build();
    }
}
