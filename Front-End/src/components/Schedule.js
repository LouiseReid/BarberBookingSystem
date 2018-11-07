import React from 'react';
import TimeSlot from './TimeSlot';
import moment from 'moment'

const Schedule = (props) => {

    const timeSlots = [
      {time:['09:00','09:30'], booking: null},
      {time:['09:30', '10:00'], booking: null},
      {time:['10:00', '10:30'], booking: null},
      {time:['10:30', '11:00'], booking: null},
      {time:['11:00', '11:30'], booking: null},
      {time:['11:30', '12:00'], booking: null},
      {time:['12:00', '12:30'], booking: null},
      {time:['12:30', '13:00'], booking: null},
      {time:['13:00', '13:30'], booking: null}
    ]


    const format = 'hh:mm'

    props.bookings.forEach((booking, index) => {
      let startTime = moment(booking.startTime)
      let endTime = moment(moment(booking.endTime).format('hh:mm'))
      timeSlots.forEach((timeSlot, index) => {
        let slotStart = moment(timeSlot.time[0], format)
        let slotEnd = moment(timeSlot.time[1], format)
        if(startTime._i.includes(slotStart._i)){
          timeSlot.booking = booking
          if(endTime._i > slotEnd._i){
            timeSlots[index +1].booking = booking
            timeSlots[index +1].time[1] = endTime._i
          }
        }
      })
    })

    const available = timeSlots.filter(timeSlot => timeSlot.booking == null)

    const availableForBarber = {
      available: available,
      barber: props.barber
    }

    props.getAvailable(availableForBarber)

    const slots = timeSlots.map((slot, index) => {
      return <TimeSlot key={index} slot={slot} />
    })

    return(
      <div className="">
        <h3>{props.barber}</h3>
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

export default Schedule;
