import React from 'react';

const TimeSlot = (props) => {

    const {time, booking} = props.slot
    const startTime = time[0]
    const endTime = time[1]

    if(booking != null){

      return(
        <tr>
          <td>{startTime} - {endTime}</td>
          <td>{booking.customer.name}</td>
          <td>{booking.service.name}</td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{startTime} - {endTime}</td>
          <td>-</td>
          <td>-</td>
        </tr>
      )
    }
  }


export default TimeSlot;
