import React from 'react';
import moment from 'moment'

const BookingForm = ({bookingCriteria, services, customers}) => {

   if(bookingCriteria.barber === null) return null;

   const niceDate = moment(bookingCriteria.date).format('ll')

   const slotStart = bookingCriteria.availableSlots.map((time, index) => {
     return <option key={index} value={time.time[0]}>{time.time[0]}</option>
   })

   const serviceOptions = services.map((service, index) => {
     return <option key={index} value={service._links.self.href}>{service.name}</option>
   })

   const customerOptions = customers.map((customer, index) => {
     return <option key={index} value={customer._links.self.href}>{customer.name}</option>
   })

   function handleFormSubmit(evt) {
     evt.preventDefault()
     const booking = {
       "startTime": `${bookingCriteria.date}T${evt.target.startTime.value}`,
       "barber": bookingCriteria.barber.url,
       "service": evt.target.service.value,
       "customer": evt.target.customer.value
     }
     console.log(booking);
   }

  return(
    <div>
      <p>Barber: {bookingCriteria.barber.name}</p>
      <p>Date: {niceDate}</p>
      <form onSubmit={handleFormSubmit}>
        <select name="startTime">
          {slotStart}
        </select>
        <select name="service">
          {serviceOptions}
        </select>
        <select name="customer">
          {customerOptions}
        </select>
        <button type="submit">Book</button>
      </form>
    </div>
  )
}


export default BookingForm
