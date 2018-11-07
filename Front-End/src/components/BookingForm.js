import React from 'react';

const BookingForm = (props) => {

  const barbers = props.barbers.map((barber, index) => {
    return <option key={index}
      value={barber._links.self.href}>{barber.name}</option>
    })

    const services = props.services.map((service, index) => {
      return <option key={index}
        value={service._links.self.href}>{service.name}</option>
      })

      const customers = props.customers.map((customer, index) => {
        return <option key={index}
          value={customer._links.self.href}>{customer.name}</option>
        })

        function handleSubmit(evt){
          evt.preventDefault();
          const booking = {
            "startTime": evt.target.startTime.value,
            "service": evt.target.service.value,
            "barber": evt.target.barber.value,
            "customer": evt.target.customer.value
          }
          props.handleBookingPost(booking);
        }

        return(
          <div>
            <form onSubmit={handleSubmit}>

            </form>
          </div>
        )
      }

      export default BookingForm
