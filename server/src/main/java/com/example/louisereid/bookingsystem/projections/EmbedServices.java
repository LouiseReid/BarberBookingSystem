package com.example.louisereid.bookingsystem.projections;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.models.Service;
import org.springframework.data.rest.core.config.Projection;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Projection(name = "embedServices", types = Booking.class)
public interface EmbedServices {
    long getId();
    Customer getCustomer();
    Barber getBarber();
    LocalDateTime getStartTime();
    LocalDateTime getEndTime();
    double getPrice();
    Service getService();
}
