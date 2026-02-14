package com.aerocity.be.admin.controller;

import com.aerocity.be.admin.dto.AdminTicketResponse;
import com.aerocity.be.admin.dto.TicketRequest;
import com.aerocity.be.admin.service.AdminTicketService;
import com.aerocity.be.shared.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tickets")
@RequiredArgsConstructor
public class AdminController {

    private final AdminTicketService adminTicketService;

    @PostMapping
    public ResponseEntity<ApiResponse<AdminTicketResponse>> createTicket(@RequestBody TicketRequest request) {
        try {
            AdminTicketResponse response = adminTicketService.createTicket(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<AdminTicketResponse>(true, "Ticket created successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<AdminTicketResponse>(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminTicketResponse>> updateTicket(
            @PathVariable Long id,
            @RequestBody TicketRequest request) {
        try {
            AdminTicketResponse response = adminTicketService.updateTicket(id, request);
            return ResponseEntity.ok(new ApiResponse<AdminTicketResponse>(true, "Ticket updated successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<AdminTicketResponse>(false, e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminTicketResponse>>> getAllTickets(
            @RequestParam(required = false) Boolean activeOnly) {
        try {
            List<AdminTicketResponse> tickets = activeOnly != null && activeOnly
                    ? adminTicketService.getActiveTickets()
                    : adminTicketService.getAllTickets();
            return ResponseEntity.ok(new ApiResponse<List<AdminTicketResponse>>(true, "Tickets retrieved successfully", tickets));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<List<AdminTicketResponse>>(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminTicketResponse>> getTicket(@PathVariable Long id) {
        try {
            AdminTicketResponse response = adminTicketService.getTicket(id);
            return ResponseEntity.ok(new ApiResponse<AdminTicketResponse>(true, "Ticket retrieved successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<AdminTicketResponse>(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTicket(@PathVariable Long id) {
        try {
            adminTicketService.deleteTicket(id);
            return ResponseEntity.ok(new ApiResponse<Void>(true, "Ticket deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<Void>(false, e.getMessage(), null));
        }
    }
}

