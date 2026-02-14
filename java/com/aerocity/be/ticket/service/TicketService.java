package com.aerocity.be.ticket.service;

import com.aerocity.be.offer.entity.Offer;
import com.aerocity.be.offer.entity.OfferTicketPrice;
import com.aerocity.be.offer.repository.OfferRepository;
import com.aerocity.be.ticket.dto.PublicTicketResponse;
import com.aerocity.be.ticket.entity.Ticket;
import com.aerocity.be.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final OfferRepository offerRepository;

    public List<PublicTicketResponse> getActiveTickets(boolean isAgent) {
        LocalDate today = LocalDate.now();
        List<Ticket> tickets = ticketRepository.findByIsActiveTrue();
        List<Offer> activeOffers = offerRepository.findAllActiveOffersWithPrices(today);
        
        // Map ticketId to applicable offers/prices
        Map<Long, List<OfferPriceInfo>> ticketOffersMap = new HashMap<>();
        
        for (Offer offer : activeOffers) {
            for (OfferTicketPrice otp : offer.getOfferPrices()) {
                Long ticketId = otp.getTicket().getId();
                ticketOffersMap.computeIfAbsent(ticketId, k -> new ArrayList<>())
                        .add(new OfferPriceInfo(offer, otp.getOfferPrice()));
            }
        }
        
        return tickets.stream()
                .map(ticket -> {
                    List<OfferPriceInfo> offers = ticketOffersMap.getOrDefault(ticket.getId(), new ArrayList<>());
                    return mapToPublicTicketResponse(ticket, isAgent, offers);
                })
                .collect(Collectors.toList());
    }

    public PublicTicketResponse getTicket(Long id, boolean isAgent) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        
        if (!ticket.getIsActive()) {
            throw new RuntimeException("Ticket is not active");
        }
        
        LocalDate today = LocalDate.now();
        List<Offer> activeOffers = offerRepository.findActiveOffersByTicketId(id, today);
        
        List<OfferPriceInfo> offers = new ArrayList<>();
        for (Offer offer : activeOffers) {
            for (OfferTicketPrice otp : offer.getOfferPrices()) {
                if (otp.getTicket().getId().equals(id)) {
                    offers.add(new OfferPriceInfo(offer, otp.getOfferPrice()));
                }
            }
        }
        
        return mapToPublicTicketResponse(ticket, isAgent, offers);
    }

    private PublicTicketResponse mapToPublicTicketResponse(Ticket ticket, boolean isAgent, List<OfferPriceInfo> applicableOffers) {
        // Find best offer (lowest price)
        OfferPriceInfo bestOffer = null;
        if (!applicableOffers.isEmpty()) {
            bestOffer = applicableOffers.get(0);
            for (OfferPriceInfo info : applicableOffers) {
                if (info.price.compareTo(bestOffer.price) < 0) {
                    bestOffer = info;
                }
            }
        }
        
        BigDecimal price = ticket.getCustomerPrice();
        if (bestOffer != null) {
            price = bestOffer.price;
        }

        PublicTicketResponse response = new PublicTicketResponse();
        response.setId(ticket.getId());
        response.setName(ticket.getName());
        response.setDescription(ticket.getDescription());
        response.setPrice(price);
        
        // Only show agent price to agents
        if (isAgent) {
            response.setAgentPrice(ticket.getAgentPrice());
        }
        
        // Add active offer info if available
        if (bestOffer != null) {
            PublicTicketResponse.ActiveOfferInfo offerInfo = new PublicTicketResponse.ActiveOfferInfo(
                    bestOffer.offer.getId(),
                    bestOffer.offer.getName(),
                    bestOffer.price,
                    bestOffer.offer.getEndDate().toString()
            );
            response.setActiveOffer(offerInfo);
        }
        
        return response;
    }
    
    private static class OfferPriceInfo {
        Offer offer;
        BigDecimal price;
        
        public OfferPriceInfo(Offer offer, BigDecimal price) {
            this.offer = offer;
            this.price = price;
        }
    }
}
