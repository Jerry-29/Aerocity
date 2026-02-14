package com.aerocity.be.admin.service;

import com.aerocity.be.admin.dto.AdminTicketResponse;
import com.aerocity.be.admin.dto.TicketRequest;
import com.aerocity.be.ticket.entity.Ticket;
import com.aerocity.be.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminTicketService {

    private final TicketRepository ticketRepository;

    public AdminTicketResponse createTicket(TicketRequest request) {
        if (ticketRepository.existsByName(request.getName())) {
            throw new RuntimeException("Ticket with name '" + request.getName() + "' already exists");
        }

        Ticket ticket = new Ticket();
        ticket.setName(request.getName());
        ticket.setDescription(request.getDescription());
        ticket.setCustomerPrice(request.getCustomerPrice());
        ticket.setAgentPrice(request.getAgentPrice());
        ticket.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToAdminTicketResponse(savedTicket);
    }

    public AdminTicketResponse updateTicket(Long id, TicketRequest request) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));

        // Check if name is being changed and if new name already exists
        if (!ticket.getName().equals(request.getName()) && ticketRepository.existsByName(request.getName())) {
            throw new RuntimeException("Ticket with name '" + request.getName() + "' already exists");
        }

        ticket.setName(request.getName());
        ticket.setDescription(request.getDescription());
        ticket.setCustomerPrice(request.getCustomerPrice());
        ticket.setAgentPrice(request.getAgentPrice());
        if (request.getIsActive() != null) {
            ticket.setIsActive(request.getIsActive());
        }

        Ticket updatedTicket = ticketRepository.save(ticket);
        return mapToAdminTicketResponse(updatedTicket);
    }

    public AdminTicketResponse getTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        return mapToAdminTicketResponse(ticket);
    }

    public List<AdminTicketResponse> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::mapToAdminTicketResponse)
                .collect(Collectors.toList());
    }

    public List<AdminTicketResponse> getActiveTickets() {
        return ticketRepository.findByIsActiveTrue().stream()
                .map(this::mapToAdminTicketResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found with id: " + id));
        ticketRepository.delete(ticket);
    }

    private AdminTicketResponse mapToAdminTicketResponse(Ticket ticket) {
        return new AdminTicketResponse(
                ticket.getId(),
                ticket.getName(),
                ticket.getDescription(),
                ticket.getCustomerPrice(),
                ticket.getAgentPrice(),
                ticket.getIsActive(),
                ticket.getCreatedAt()
        );
    }
}

