package com.aerocity.be.booking.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class BookingRequest {
    private LocalDate visitDate;
    private List<BookingItemRequest> items;
    private String customerName;
    private String customerMobile;
    private String customerEmail;
}
