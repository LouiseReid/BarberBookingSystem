package com.example.louisereid.bookingsystem.repositories.Booking;

import com.example.louisereid.bookingsystem.models.Booking;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepositotyCustom {

    List<Booking> allBookingsForDate(LocalDateTime date);
}
