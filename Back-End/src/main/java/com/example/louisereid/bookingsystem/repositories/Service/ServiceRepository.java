package com.example.louisereid.bookingsystem.repositories.Service;

import com.example.louisereid.bookingsystem.models.Service;
import com.example.louisereid.bookingsystem.projections.EmbedBookings;
import com.example.louisereid.bookingsystem.projections.EmbedBookingsServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedBookingsServices.class)
public interface ServiceRepository extends JpaRepository<Service, Long> {
}
