package com.aerocity.be.booking.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingItemDTO {
    private Long ticketId;
    private String ticketName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private Boolean isOfferApplied;
}
