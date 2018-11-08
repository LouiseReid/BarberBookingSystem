import React from 'react'

const BookingForm = ({bookingCriteria}) => {

   if(bookingCriteria.barber === null) return null;

  return(
    <div>
      <p>Barber: {bookingCriteria.barber.name}</p>
      {/* <p>Date: {bookingCriteria.date}</p> */}
    </div>
  )
}


export default BookingForm
