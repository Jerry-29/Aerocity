package com.aerocity.be.ticket.repository;

import com.aerocity.be.ticket.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByName(String name);
    List<Ticket> findByIsActiveTrue();
    boolean existsByName(String name);
}

