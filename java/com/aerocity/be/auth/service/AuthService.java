package com.aerocity.be.auth.service;

import com.aerocity.be.auth.dto.LoginRequest;
import com.aerocity.be.auth.dto.LoginResponse;
import com.aerocity.be.user.entity.User;
import com.aerocity.be.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByMobileAndRole(request.getMobile(), User.UserRole.ADMIN)
                .orElseThrow(() -> new RuntimeException("Invalid mobile number or user is not an admin"));

        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("User account is inactive");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getMobile(),
                user.getEmail(),
                user.getRole().name()
        );

        String token = jwtService.generateToken(user.getId(), user.getMobile(), user.getRole().name());

        return new LoginResponse(true, "Login successful", userInfo, token);
    }
}

