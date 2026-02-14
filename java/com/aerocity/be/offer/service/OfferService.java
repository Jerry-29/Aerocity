package com.aerocity.be.offer.service;

import com.aerocity.be.offer.dto.OfferRequest;
import com.aerocity.be.offer.dto.OfferResponse;
import com.aerocity.be.offer.dto.OfferTicketPriceDTO;
import com.aerocity.be.offer.entity.Offer;
import com.aerocity.be.offer.entity.OfferTicketPrice;
import com.aerocity.be.offer.repository.OfferRepository;
import com.aerocity.be.ticket.entity.Ticket;
import com.aerocity.be.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final TicketRepository ticketRepository;

    @Transactional
    public OfferResponse createOffer(OfferRequest request) {
        // Validate dates
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new RuntimeException("Start date cannot be after end date");
        }

        Offer offer = new Offer();
        offer.setName(request.getName());
        offer.setDescription(request.getDescription());
        offer.setStartDate(request.getStartDate());
        offer.setEndDate(request.getEndDate());
        offer.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        offer.setAppliesToAllCustomers(request.getAppliesToAllCustomers() != null ? request.getAppliesToAllCustomers() : true);

        if (request.getOfferTicketPrices() == null || request.getOfferTicketPrices().isEmpty()) {
            throw new RuntimeException("At least one ticket price must be provided");
        }
        
        Set<Long> ticketIds = request.getOfferTicketPrices().stream()
                .map(OfferTicketPriceDTO::getTicketId)
                .collect(Collectors.toSet());
                
        List<Ticket> tickets = ticketRepository.findAllById(ticketIds);
        if (tickets.size() != ticketIds.size()) {
            throw new RuntimeException("One or more tickets not found");
        }
        Map<Long, Ticket> ticketMap = tickets.stream().collect(Collectors.toMap(Ticket::getId, t -> t));

        Set<OfferTicketPrice> prices = new HashSet<>();
        for (OfferTicketPriceDTO otpDto : request.getOfferTicketPrices()) {
            OfferTicketPrice otp = new OfferTicketPrice();
            otp.setOffer(offer);
            otp.setTicket(ticketMap.get(otpDto.getTicketId()));
            otp.setOfferPrice(otpDto.getOfferPrice());
            prices.add(otp);
        }
        offer.setOfferPrices(prices);

        Offer savedOffer = offerRepository.save(offer);
        return mapToOfferResponse(savedOffer);
    }

    @Transactional
    public OfferResponse updateOffer(Long id, OfferRequest request) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found with id: " + id));

        // Validate dates
        if (request.getStartDate() != null && request.getEndDate() != null) {
            if (request.getStartDate().isAfter(request.getEndDate())) {
                throw new RuntimeException("Start date cannot be after end date");
            }
        }

        if (request.getName() != null) {
            offer.setName(request.getName());
        }
        if (request.getDescription() != null) {
            offer.setDescription(request.getDescription());
        }
        if (request.getAppliesToAllCustomers() != null) {
            offer.setAppliesToAllCustomers(request.getAppliesToAllCustomers());
        }
        
        if (request.getOfferTicketPrices() != null) {
            offer.getOfferPrices().clear();
            
            Set<Long> ticketIds = request.getOfferTicketPrices().stream()
                    .map(OfferTicketPriceDTO::getTicketId)
                    .collect(Collectors.toSet());
                    
            List<Ticket> tickets = ticketRepository.findAllById(ticketIds);
            if (tickets.size() != ticketIds.size()) {
                throw new RuntimeException("One or more tickets not found");
            }
            Map<Long, Ticket> ticketMap = tickets.stream().collect(Collectors.toMap(Ticket::getId, t -> t));
            
            for (OfferTicketPriceDTO otpDto : request.getOfferTicketPrices()) {
                OfferTicketPrice otp = new OfferTicketPrice();
                otp.setOffer(offer);
                otp.setTicket(ticketMap.get(otpDto.getTicketId()));
                otp.setOfferPrice(otpDto.getOfferPrice());
                offer.getOfferPrices().add(otp);
            }
        }
        
        if (request.getStartDate() != null) {
            offer.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            offer.setEndDate(request.getEndDate());
        }
        if (request.getIsActive() != null) {
            offer.setIsActive(request.getIsActive());
        }

        Offer updatedOffer = offerRepository.save(offer);
        return mapToOfferResponse(updatedOffer);
    }

    public OfferResponse getOffer(Long id) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found with id: " + id));
        return mapToOfferResponse(offer);
    }

    public List<OfferResponse> getAllOffers() {
        return offerRepository.findAll().stream()
                .map(this::mapToOfferResponse)
                .collect(Collectors.toList());
    }

    public List<OfferResponse> getOffersByTicket(Long ticketId) {
        return offerRepository.findOffersByTicketId(ticketId).stream()
                .map(this::mapToOfferResponse)
                .collect(Collectors.toList());
    }

    public List<OfferResponse> getActiveOffers() {
        LocalDate today = LocalDate.now();
        return offerRepository.findAllActiveOffersWithPrices(today).stream()
                .map(this::mapToOfferResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteOffer(Long id) {
        Offer offer = offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found with id: " + id));
        offerRepository.delete(offer);
    }

    private OfferResponse mapToOfferResponse(Offer offer) {
        List<OfferTicketPriceDTO> prices = offer.getOfferPrices().stream()
                .map(p -> new OfferTicketPriceDTO(p.getTicket().getId(), p.getOfferPrice()))
                .collect(Collectors.toList());
        return new OfferResponse(
                offer.getId(),
                offer.getName(),
                offer.getDescription(),
                prices,
                offer.getStartDate(),
                offer.getEndDate(),
                offer.getIsActive(),
                offer.getAppliesToAllCustomers(),
                offer.isCurrentlyValid(),
                offer.getCreatedAt()
        );
    }
}
