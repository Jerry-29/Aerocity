package com.aerocity.be.booking.dto;

import lombok.Data;

@Data
public class BookingItemRequest {
    private Long ticketId;
    private Integer quantity;
}
