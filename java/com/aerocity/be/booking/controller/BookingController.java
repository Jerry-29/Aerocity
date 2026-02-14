package com.aerocity.be.booking.controller;

import com.aerocity.be.booking.dto.BookingRequest;
import com.aerocity.be.booking.dto.BookingResponse;
import com.aerocity.be.booking.dto.PaymentVerificationRequest;
import com.aerocity.be.booking.service.BookingService;
import com.aerocity.be.shared.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@RequestBody BookingRequest request) {
        try {
            BookingResponse response = bookingService.createBooking(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Booking initiated successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<ApiResponse<BookingResponse>> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        try {
            BookingResponse response = bookingService.verifyPayment(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Payment verified successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{reference}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBooking(@PathVariable String reference) {
        try {
            BookingResponse response = bookingService.getBooking(reference);
            return ResponseEntity.ok(new ApiResponse<>(true, "Booking details retrieved successfully", response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}
