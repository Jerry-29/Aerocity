package com.aerocity.be.offer.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OfferRequest {
    private String name;
    private String description;
    private List<OfferTicketPriceDTO> offerTicketPrices;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isActive;
    private Boolean appliesToAllCustomers;
}
