package com.backend.FireFlyBackend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(customizer -> customizer.disable()) // or `.cors(Customizer.withDefaults())` if you want to enable it
                .csrf(csrf -> csrf.disable()) // ✅ disable CSRF for API endpoints
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/","/googleLogin**").permitAll()// ✅ Allow public access
                        .anyRequest().authenticated() // ✅ Everything else requires auth
                )
                .oauth2Login(oauth->oauth
                        .defaultSuccessUrl("/googleLogin",true));

        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
