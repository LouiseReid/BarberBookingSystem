package com.example.louisereid.bookingsystem.repositories.Barber;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.projections.EmbedBookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedBookings.class)
public interface BarberRepository extends JpaRepository<Barber, Long> {
}
