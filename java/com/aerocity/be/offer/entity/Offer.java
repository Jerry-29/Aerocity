package com.aerocity.be.offer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "offers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<OfferTicketPrice> offerPrices = new HashSet<>();

    @Column(name = "applies_to_all_customers", nullable = false)
    private Boolean appliesToAllCustomers = true;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Helper methods to check if offer is currently valid
    public boolean isCurrentlyValid(LocalDate today) {
        return Boolean.TRUE.equals(isActive) && !today.isBefore(startDate) && !today.isAfter(endDate);
    }

    public boolean isCurrentlyValid() {
        LocalDate today = LocalDate.now();
        return Boolean.TRUE.equals(isActive) && !today.isBefore(startDate) && !today.isAfter(endDate);
    }
}
