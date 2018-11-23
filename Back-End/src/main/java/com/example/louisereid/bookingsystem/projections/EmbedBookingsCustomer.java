package com.example.louisereid.bookingsystem.projections;

import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.models.Customer;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "embedBookingsCustomers", types = Customer.class)
public interface EmbedBookingsCustomer {
    long getId();
    String getFirstName();
    String getLastName();
    String getPhoneNo();
    List<Booking> getBookings();
}
