package com.example.louisereid.bookingsystem.repositories.Customer;

import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.projections.EmbedBookingsCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedBookingsCustomer.class)
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
