package com.aerocity.be.booking.service;

import com.aerocity.be.booking.dto.*;
import com.aerocity.be.booking.entity.Booking;
import com.aerocity.be.booking.entity.BookingItem;
import com.aerocity.be.booking.enums.BookedByRole;
import com.aerocity.be.booking.enums.BookingStatus;
import com.aerocity.be.booking.repository.BookingItemRepository;
import com.aerocity.be.booking.repository.BookingRepository;
import com.aerocity.be.offer.entity.Offer;
import com.aerocity.be.offer.entity.OfferTicketPrice;
import com.aerocity.be.offer.repository.OfferRepository;
import com.aerocity.be.payment.service.RazorpayService;
import com.aerocity.be.ticket.entity.Ticket;
import com.aerocity.be.ticket.repository.TicketRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingItemRepository bookingItemRepository;
    private final TicketRepository ticketRepository;
    private final OfferRepository offerRepository;
    private final RazorpayService razorpayService;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        // Validate request
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Booking must contain at least one item");
        }

        // Fetch all active offers for today
        LocalDate today = LocalDate.now();
        List<Offer> activeOffers = offerRepository.findAllActiveOffersWithPrices(today);

        // Fetch all requested tickets
        Set<Long> ticketIds = request.getItems().stream()
                .map(BookingItemRequest::getTicketId)
                .collect(Collectors.toSet());
        List<Ticket> tickets = ticketRepository.findAllById(ticketIds);
        Map<Long, Ticket> ticketMap = tickets.stream()
                .collect(Collectors.toMap(Ticket::getId, t -> t));

        // Create Booking
        Booking booking = new Booking();
        booking.setVisitDate(request.getVisitDate());
        booking.setBookedByRole(BookedByRole.CUSTOMER); // Default for now
        booking.setCustomerName(request.getCustomerName());
        booking.setCustomerMobile(request.getCustomerMobile());
        booking.setCustomerEmail(request.getCustomerEmail());
        booking.setPaymentStatus(BookingStatus.PENDING);
        booking.setTotalAmount(BigDecimal.ZERO);
        
        // Save initial booking to generate ID and Reference
        booking = bookingRepository.save(booking);

        BigDecimal totalAmount = BigDecimal.ZERO;
        Set<BookingItem> bookingItems = new HashSet<>();

        for (BookingItemRequest itemRequest : request.getItems()) {
            Ticket ticket = ticketMap.get(itemRequest.getTicketId());
            if (ticket == null) {
                throw new RuntimeException("Ticket not found: " + itemRequest.getTicketId());
            }

            // Calculate Best Price
            BigDecimal bestPrice = ticket.getCustomerPrice();
            boolean isOfferApplied = false;
            Offer appliedOffer = null;

            for (Offer offer : activeOffers) {
                for (OfferTicketPrice otp : offer.getOfferPrices()) {
                    if (otp.getTicket().getId().equals(ticket.getId())) {
                        if (otp.getOfferPrice().compareTo(bestPrice) < 0) {
                            bestPrice = otp.getOfferPrice();
                            isOfferApplied = true;
                            appliedOffer = offer;
                        }
                    }
                }
            }
            
            // If offer applied, we can link it. 
            // Note: Booking has one offer field, but offers can be per item.
            // For now, we will just track if offer was applied on item level.
            // If we want to track which offer, we might need to update BookingItem entity to have offer_id.
            // But currently BookingItem has isOfferApplied.

            BookingItem item = new BookingItem();
            item.setBooking(booking);
            item.setTicket(ticket);
            item.setQuantity(itemRequest.getQuantity());
            item.setBasePrice(ticket.getCustomerPrice());
            item.setAppliedPrice(bestPrice);
            item.setIsOfferApplied(isOfferApplied);
            item.setTotalPrice(bestPrice.multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
            
            bookingItems.add(item);
            totalAmount = totalAmount.add(item.getTotalPrice());
        }

        booking.setBookingItems(bookingItems);
        booking.setTotalAmount(totalAmount);
        
        // Save booking items and update booking total
        bookingRepository.save(booking); // Cascades to items due to CascadeType.ALL

        // Create Razorpay Order
        try {
            Order order = razorpayService.createOrder(totalAmount, booking.getBookingReference());
            booking.setRazorpayOrderId(order.get("id"));
            bookingRepository.save(booking);
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }

        return mapToBookingResponse(booking);
    }

    @Transactional
    public BookingResponse verifyPayment(PaymentVerificationRequest request) {
        Booking booking = bookingRepository.findByBookingReference(request.getBookingReference())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getRazorpayOrderId().equals(request.getRazorpayOrderId())) {
            throw new RuntimeException("Order ID mismatch");
        }

        try {
            boolean isValid = razorpayService.verifyPaymentSignature(
                    request.getRazorpayOrderId(),
                    request.getRazorpayPaymentId(),
                    request.getRazorpaySignature()
            );

            if (isValid) {
                booking.setPaymentStatus(BookingStatus.PAID);
                booking.setRazorpayPaymentId(request.getRazorpayPaymentId());
                booking.setIsValidated(false); // Validated means entry validated, not payment validated
            } else {
                booking.setPaymentStatus(BookingStatus.FAILED);
            }
            
            booking = bookingRepository.save(booking);
            return mapToBookingResponse(booking);

        } catch (RazorpayException e) {
            booking.setPaymentStatus(BookingStatus.FAILED);
            bookingRepository.save(booking);
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }
    
    public BookingResponse getBooking(String bookingReference) {
        Booking booking = bookingRepository.findByBookingReference(bookingReference)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToBookingResponse(booking);
    }

    private BookingResponse mapToBookingResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setBookingReference(booking.getBookingReference());
        response.setVisitDate(booking.getVisitDate());
        response.setTotalAmount(booking.getTotalAmount());
        response.setPaymentStatus(booking.getPaymentStatus().name());
        response.setRazorpayOrderId(booking.getRazorpayOrderId());
        response.setCustomerName(booking.getCustomerName());
        response.setCustomerMobile(booking.getCustomerMobile());
        response.setCustomerEmail(booking.getCustomerEmail());
        response.setCreatedAt(booking.getCreatedAt());

        List<BookingItemDTO> itemDTOs = booking.getBookingItems().stream()
                .map(item -> {
                    BookingItemDTO dto = new BookingItemDTO();
                    dto.setTicketId(item.getTicket().getId());
                    dto.setTicketName(item.getTicket().getName());
                    dto.setQuantity(item.getQuantity());
                    dto.setUnitPrice(item.getAppliedPrice());
                    dto.setTotalPrice(item.getTotalPrice());
                    dto.setIsOfferApplied(item.getIsOfferApplied());
                    return dto;
                })
                .collect(Collectors.toList());

        response.setItems(itemDTOs);
        return response;
    }
}
