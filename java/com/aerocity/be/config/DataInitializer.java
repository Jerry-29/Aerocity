package com.aerocity.be.config;

import com.aerocity.be.user.entity.User;
import com.aerocity.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create default admin user if it doesn't exist
        if (!userRepository.existsByMobile("9999999999")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setMobile("9999999999");
            admin.setEmail("admin@aerocity.com");
            admin.setRole(User.UserRole.ADMIN);
            admin.setPassword(passwordEncoder.encode("admin123")); // Default password
            admin.setStatus(User.UserStatus.ACTIVE);
            userRepository.save(admin);
            System.out.println("Default admin user created: mobile=9999999999, password=admin123");
        }
    }
}

