package com.aerocity.be.booking.dto;

import lombok.Data;

@Data
public class PaymentVerificationRequest {
    private String bookingReference;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}
