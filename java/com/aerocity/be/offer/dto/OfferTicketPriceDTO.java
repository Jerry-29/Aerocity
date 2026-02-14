package com.aerocity.be.offer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferTicketPriceDTO {
    private Long ticketId;
    private BigDecimal offerPrice;
}
