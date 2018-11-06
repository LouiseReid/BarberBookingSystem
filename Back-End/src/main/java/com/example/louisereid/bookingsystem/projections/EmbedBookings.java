package com.example.louisereid.bookingsystem.projections;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.models.Service;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "embedBookings", types = {Customer.class, Barber.class})
public interface EmbedBookings {
    long getId();
    String getName();
    List<Booking> getBookings();
}
