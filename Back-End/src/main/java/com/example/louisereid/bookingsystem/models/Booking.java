package com.example.louisereid.bookingsystem.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "barber_id", nullable = false)
    private Barber barber;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @JsonSerialize(using=LocalDateTimeSerializer.class)
    @Column(name = "start_time")
    private LocalDateTime startTime;

    @JsonSerialize(using=LocalDateTimeSerializer.class)
    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "price")
    private double price;

    public Booking(Customer customer, Barber barber, LocalDateTime startTime, Service service) {
        this.customer = customer;
        this.barber = barber;
        this.startTime = startTime;
        this.service = service;
        this.endTime = null;
        this.price = this.service.getPrice();
        this.calculateEndTime();
    }

    public Booking() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Barber getBarber() {
        return barber;
    }

    public void setBarber(Barber barber) {
        this.barber = barber;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void calculateEndTime(){
        int duration = this.service.getDuration();
        this.setEndTime(this.startTime.plusMinutes(duration));
    }


}
