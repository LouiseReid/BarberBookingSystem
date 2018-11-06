package com.example.louisereid.bookingsystem.repositories.Customer;

import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.projections.EmbedBookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedBookings.class)
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
