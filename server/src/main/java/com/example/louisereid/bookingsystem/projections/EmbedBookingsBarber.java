package com.example.louisereid.bookingsystem.projections;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "embedBookingsBarbers", types = Barber.class)
public interface EmbedBookingsBarber {
    long getId();
    String getName();
    List<Booking> getBookings();
}
