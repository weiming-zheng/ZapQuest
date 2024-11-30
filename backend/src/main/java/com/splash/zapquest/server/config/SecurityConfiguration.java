package com.splash.zapquest.server.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfiguration {

    /**
     * Creates a PasswordEncoder bean for password hashing
     * BCryptPasswordEncoder is a secure implementation that uses the BCrypt strong hashing function
     * Default strength is 10, which is generally considered a good balance of security and performance
     *
     * @return configured BCryptPasswordEncoder instance
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}