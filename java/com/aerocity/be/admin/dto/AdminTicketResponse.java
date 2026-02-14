package com.aerocity.be.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminTicketResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal customerPrice;
    private BigDecimal agentPrice;
    private Boolean isActive;
    private LocalDateTime createdAt;
}

