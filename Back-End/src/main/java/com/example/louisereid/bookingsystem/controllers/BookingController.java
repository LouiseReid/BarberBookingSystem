package com.example.louisereid.bookingsystem.controllers;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.repositories.Barber.BarberRepository;
import com.example.louisereid.bookingsystem.repositories.Booking.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @GetMapping(value = "/date/{date}")
    public List<Booking> allBookingsForDate(@PathVariable String date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate ld = LocalDate.parse(date, formatter);
        LocalDateTime ldt = LocalDateTime.of(ld, LocalTime.of(0,0));
        return bookingRepository.allBookingsForDate(ldt);
    }
}
