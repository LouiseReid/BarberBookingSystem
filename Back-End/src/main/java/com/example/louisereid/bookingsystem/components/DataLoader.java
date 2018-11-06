package com.example.louisereid.bookingsystem.components;


import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.models.Service;
import com.example.louisereid.bookingsystem.repositories.Barber.BarberRepository;
import com.example.louisereid.bookingsystem.repositories.Booking.BookingRepository;
import com.example.louisereid.bookingsystem.repositories.Customer.CustomerRepository;
import com.example.louisereid.bookingsystem.repositories.Service.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;


@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    BarberRepository barberRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    BookingRepository bookingRepository;


    @Autowired
    ServiceRepository serviceRepository;


    public DataLoader() {

    }

    public void run(ApplicationArguments args) {

        Service beardTrim = new Service("Beard Trim", 5.00, 10);
        serviceRepository.save(beardTrim);

        Service fade = new Service("Fade", 15.00, 20);
        serviceRepository.save(fade);

        Barber gemma = new Barber("Gemma");
        barberRepository.save(gemma);

        Barber alan = new Barber("Alan");
        barberRepository.save(alan);

        Barber jeff = new Barber("Jeff");
        barberRepository.save(jeff);

        Customer customer1 = new Customer("Joe");
        customerRepository.save(customer1);

        Customer customer2 = new Customer("Steve");
        customerRepository.save(customer2);


        LocalDateTime startTime = LocalDateTime.of(2018, Month.NOVEMBER, 5, 12, 30);

        Booking booking1 = new Booking(customer1, gemma, startTime, beardTrim);
        bookingRepository.save(booking1);

        gemma.addBooking(booking1);
        barberRepository.save(gemma);

        customer1.addBooking(booking1);
        customerRepository.save(customer1);

        beardTrim.addBooking(booking1);
        serviceRepository.save(beardTrim);


    }
}