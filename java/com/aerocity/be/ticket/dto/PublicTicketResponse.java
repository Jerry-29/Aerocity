package com.aerocity.be.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PublicTicketResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price; // Customer price or active offer price
    private BigDecimal agentPrice; // Only shown to agents
    private ActiveOfferInfo activeOffer; // Current active offer if any

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActiveOfferInfo {
        private Long offerId;
        private String offerName;
        private BigDecimal offerPrice;
        private String validUntil; // End date as string
    }
}

