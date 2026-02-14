package com.aerocity.be.offer.controller;

import com.aerocity.be.offer.dto.OfferRequest;
import com.aerocity.be.offer.dto.OfferResponse;
import com.aerocity.be.offer.service.OfferService;
import com.aerocity.be.shared.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/offers")
@RequiredArgsConstructor
public class OfferController {

    private final OfferService offerService;

    @PostMapping
    public ResponseEntity<ApiResponse<OfferResponse>> createOffer(@RequestBody OfferRequest request) {
        try {
            OfferResponse response = offerService.createOffer(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>(true, "Offer created successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<OfferResponse>> updateOffer(
            @PathVariable Long id,
            @RequestBody OfferRequest request) {
        try {
            OfferResponse response = offerService.updateOffer(id, request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Offer updated successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OfferResponse>>> getAllOffers(
            @RequestParam(required = false) Long ticketId,
            @RequestParam(required = false) Boolean activeOnly) {
        try {
            List<OfferResponse> offers;
            if (ticketId != null) {
                offers = offerService.getOffersByTicket(ticketId);
            } else if (activeOnly != null && activeOnly) {
                offers = offerService.getActiveOffers();
            } else {
                offers = offerService.getAllOffers();
            }
            return ResponseEntity.ok(new ApiResponse<>(true, "Offers retrieved successfully", offers));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OfferResponse>> getOffer(@PathVariable Long id) {
        try {
            OfferResponse response = offerService.getOffer(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Offer retrieved successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteOffer(@PathVariable Long id) {
        try {
            offerService.deleteOffer(id);
            return ResponseEntity.ok(new ApiResponse<>(true, "Offer deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}

