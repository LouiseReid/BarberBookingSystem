import React from 'react';
import TimeSlot from './TimeSlot';
import moment from 'moment'

class Schedule extends React.Component{

  render(){

    const timeSlots = [
      {time:['09:00','09:30'], booking: null},
      {time:['09:30', '10:00'], booking: null},
      {time:['10:00', '10:30'], booking:null},
      {time:['10:30', '11:00'], booking: null},
      {time:['11:00', '11:30'], booking: null},
      {time:['11:30', '12:00'], booking: null},
      {time:['12:00', '12:30'], booking: null},
      {time:['12:30', '13:00'], booking: null},
      {time:['13:00', '13:30'], booking: null}
    ]

    this.props.bookings.forEach((booking, index) => {
      timeSlots.forEach((timeSlot) => {
        if(booking.startTime.includes(moment(timeSlot.time[0], 'HH:mm').format('HH:mm'))){
          timeSlot.booking = booking
        }
      })
    })



    const slots = timeSlots.map((slot, index) => {
      return <TimeSlot key={index} slot={slot} />
    })

    return(
      <div className="">
        <h3>{this.props.barber}</h3>
        <table>
          <tbody>
            <tr>
              <th>Time</th>
              <th>Client</th>
              <th>Service</th>
            </tr>
            {slots}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Schedule;
