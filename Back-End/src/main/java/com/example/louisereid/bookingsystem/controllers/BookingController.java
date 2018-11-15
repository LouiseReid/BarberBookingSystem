package com.example.louisereid.bookingsystem.controllers;

import com.example.louisereid.bookingsystem.models.Barber;
import com.example.louisereid.bookingsystem.models.Booking;
import com.example.louisereid.bookingsystem.models.Customer;
import com.example.louisereid.bookingsystem.models.Service;
import com.example.louisereid.bookingsystem.repositories.Barber.BarberRepository;
import com.example.louisereid.bookingsystem.repositories.Booking.BookingRepository;
import com.example.louisereid.bookingsystem.repositories.Customer.CustomerRepository;
import com.example.louisereid.bookingsystem.repositories.Service.ServiceRepository;
import com.sun.jndi.toolkit.url.Uri;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.*;


import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api/bookings")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    BarberRepository barberRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ServiceRepository serviceRepository;


    @RequestMapping(value = "/new", headers = "Accept=application/json", method = RequestMethod.POST)
    public void post(@RequestBody HashMap<String, String> requestData) throws MalformedURLException {
        String barberStr = requestData.get("barber");
        Uri barberUri = new Uri(barberStr);
        String barberPath = barberUri.getPath();
        String barberStringId = barberPath.substring(barberPath.lastIndexOf('/') + 1);
        Long barberId = Long.parseLong(barberStringId);
        Optional foundBarber = barberRepository.findById(barberId);
        Barber barber = null;
        if (foundBarber.isPresent()){
            barber = (Barber)foundBarber.get();
        }

        String startTimeStr = requestData.get("startTime");
        LocalDateTime startTime = LocalDateTime.parse(startTimeStr);

        String customerStr = requestData.get("customer");
        Uri customerUri = new Uri(customerStr);
        String customerPath = customerUri.getPath();
        String customerStringId = customerPath.substring(customerPath.lastIndexOf('/') +1);
        Long customerId = Long.parseLong(customerStringId);
        Optional foundCustomer = customerRepository.findById(customerId);
        Customer customer = null;
        if(foundCustomer.isPresent()){
            customer = (Customer)foundCustomer.get();
        }

        String serviceStr = requestData.get("service");
        Uri serviceUri = new Uri(serviceStr);
        String servicePath = serviceUri.getPath();
        String serviceStringId = servicePath.substring(servicePath.lastIndexOf('/') +1);
        Long serviceId = Long.parseLong(serviceStringId);
        Optional foundService = serviceRepository.findById(serviceId);
        Service service = null;
        if(foundService.isPresent()){
            service = (Service)foundService.get();
        }

        Booking booking = new Booking(customer, barber, startTime, service);
        booking.calculateEndTime();
        bookingRepository.save(booking);

    }




}
