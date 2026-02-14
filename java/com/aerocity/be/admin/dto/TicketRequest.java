package com.aerocity.be.admin.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TicketRequest {
    private String name;
    private String description;
    private BigDecimal customerPrice;
    private BigDecimal agentPrice;
    private Boolean isActive;
}

