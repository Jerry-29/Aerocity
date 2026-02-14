package com.aerocity.be.booking.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BookingResponse {
    private Long id;
    private String bookingReference;
    private LocalDate visitDate;
    private BigDecimal totalAmount;
    private String paymentStatus;
    private String razorpayOrderId;
    private String customerName;
    private String customerMobile;
    private String customerEmail;
    private List<BookingItemDTO> items;
    private LocalDateTime createdAt;
}
