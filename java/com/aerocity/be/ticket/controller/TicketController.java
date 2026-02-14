package com.aerocity.be.ticket.controller;

import com.aerocity.be.shared.dto.ApiResponse;
import com.aerocity.be.ticket.dto.PublicTicketResponse;
import com.aerocity.be.ticket.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PublicTicketResponse>>> getActiveTickets(
            Authentication authentication) {
        try {
            // Check if user is authenticated and is an agent
            boolean isAgent = authentication != null && 
                    authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_AGENT"));
            
            List<PublicTicketResponse> tickets = ticketService.getActiveTickets(isAgent);
            return ResponseEntity.ok(new ApiResponse<>(true, "Tickets retrieved successfully", tickets));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PublicTicketResponse>> getTicket(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            // Check if user is authenticated and is an agent
            boolean isAgent = authentication != null && 
                    authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_AGENT"));
            
            PublicTicketResponse response = ticketService.getTicket(id, isAgent);
            return ResponseEntity.ok(new ApiResponse<>(true, "Ticket retrieved successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, e.getMessage(), null));
        }
    }
}

