package com.aerocity.be.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String mobile;
    private String password;
}

