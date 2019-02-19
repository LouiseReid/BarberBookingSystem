package com.example.louisereid.bookingsystem.repositories.Booking;

import com.example.louisereid.bookingsystem.models.Booking;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class BookingRepositoryImpl  implements BookingRepositotyCustom{

    @Autowired
    EntityManager entityManager;

    @Transactional
    public List<Booking> allBookingsForDate(LocalDateTime date){
        List<Booking> result = null;
        Session session = entityManager.unwrap(Session.class);
        try {
            Criteria cr = session.createCriteria(Booking.class);
            System.out.println(date);
            cr.add(Restrictions.ilike("startTime", date));
            result = cr.list();
        } catch (HibernateException ex){
            ex.printStackTrace();
        } finally {
            session.close();
        }

        return result;

    }
}