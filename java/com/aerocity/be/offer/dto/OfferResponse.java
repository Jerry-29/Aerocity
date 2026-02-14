package com.aerocity.be.offer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferResponse {
    private Long id;
    private String name;
    private String description;
    private List<OfferTicketPriceDTO> offerTicketPrices;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive;
    private Boolean appliesToAllCustomers;
    private Boolean isCurrentlyValid;
    private LocalDateTime createdAt;
}
