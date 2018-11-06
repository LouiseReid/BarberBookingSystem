package com.example.louisereid.bookingsystem.repositories.Booking;

import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.projections.EmbedServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedServices.class)
public interface BookingRepository extends JpaRepository<Booking, Long>, BookingRepositotyCustom{
}
