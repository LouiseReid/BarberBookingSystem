import React from 'react';
import TimeSlot from './TimeSlot';
import moment from 'moment'

const Schedule = (props) => {

    const format = 'hh:mm'

    props.bookings.forEach((booking, index) => {
      let startTime = moment(booking.startTime)
      let endTime = moment(moment(booking.endTime).format('hh:mm'))
      props.timeSlots.forEach((timeSlot, index) => {
        let slotStart = moment(timeSlot.time[0], format)
        let slotEnd = moment(timeSlot.time[1], format)
        if(startTime._i.includes(slotStart._i)){
          timeSlot.booking = booking
          if(endTime._i > slotEnd._i){
            props.timeSlots[index +1].booking = booking
            props.timeSlots[index +1].time[1] = endTime._i
          }
        }
      })
    })

    const available = props.timeSlots.filter(timeSlot => timeSlot.booking == null)
    //
    // const availableForBarber = {
    //   available: available,
    //   barber: props.barber
    // }
    //
    // props.getAvailable(availableForBarber)

    const slots = props.timeSlots.map((slot, index) => {
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
