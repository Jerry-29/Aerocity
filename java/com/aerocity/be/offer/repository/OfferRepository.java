package com.aerocity.be.offer.repository;

import com.aerocity.be.offer.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    
    @Query("SELECT DISTINCT o FROM Offer o JOIN FETCH o.offerPrices otp WHERE o.isActive = true " +
           "AND :currentDate >= o.startDate AND :currentDate <= o.endDate")
    List<Offer> findAllActiveOffersWithPrices(@Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT DISTINCT o FROM Offer o JOIN o.offerPrices otp WHERE otp.ticket.id = :ticketId AND o.isActive = true " +
           "AND :currentDate >= o.startDate AND :currentDate <= o.endDate")
    List<Offer> findActiveOffersByTicketId(@Param("ticketId") Long ticketId, 
                                            @Param("currentDate") LocalDate currentDate);

    @Query("SELECT DISTINCT o FROM Offer o JOIN o.offerPrices otp WHERE otp.ticket.id = :ticketId")
    List<Offer> findOffersByTicketId(@Param("ticketId") Long ticketId);
}
