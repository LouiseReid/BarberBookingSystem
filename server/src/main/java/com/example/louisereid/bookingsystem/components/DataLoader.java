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

import java.awt.print.Book;
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

        Service cutAndStyle = new Service("Cut & Style", 20.00, 30);
        serviceRepository.save(cutAndStyle);

        Service cutAndStyleAndBT = new Service("Cut & Style with Beard Trim", 23.00, 40 );
        serviceRepository.save(cutAndStyleAndBT);

        Service crewBuzzSkinHead = new Service("Crew/Buzz/Skinhead", 15.00, 15 );
        serviceRepository.save(crewBuzzSkinHead);

        Service afro = new Service("Afro Shape Up & Cut", 20.00, 30);
        serviceRepository.save(afro);

        Barber gemma = new Barber("Gemma");
        barberRepository.save(gemma);

        Barber alan = new Barber("Alan");
        barberRepository.save(alan);

        Barber jeff = new Barber("Jeff");
        barberRepository.save(jeff);

        Customer customer1 = new Customer("Joe", "Brown", "07780076534");
        customerRepository.save(customer1);

        Customer customer2 = new Customer("Steve", "Smith", "0787345672");
        customerRepository.save(customer2);

        Customer customer3 = new Customer("Sarah", "Daniels", "07765490832");
        customerRepository.save(customer3);


        LocalDateTime startTime = LocalDateTime.of(2018, Month.NOVEMBER, 23, 12, 00);

        Booking booking1 = new Booking(customer1, gemma, startTime, cutAndStyleAndBT);
        bookingRepository.save(booking1);

        gemma.addBooking(booking1);
        barberRepository.save(gemma);

        customer1.addBooking(booking1);
        customerRepository.save(customer1);

        cutAndStyleAndBT.addBooking(booking1);
        serviceRepository.save(cutAndStyleAndBT);

        LocalDateTime startTime2 = LocalDateTime.of(2018, Month.NOVEMBER, 23, 10, 30);

        Booking booking2 = new Booking(customer2, alan, startTime2, fade);
        bookingRepository.save(booking2);

        alan.addBooking(booking2);
        barberRepository.save(alan);

        fade.addBooking(booking2);
        serviceRepository.save(fade);

    }
}