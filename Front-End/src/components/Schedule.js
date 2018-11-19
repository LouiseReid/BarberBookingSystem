import React from 'react';
import TimeSlot from './TimeSlot';
import moment from 'moment'

const Schedule = (props) => {

  const timeSlots = [
    {time:['09:00','09:30'], booking: null, clash: false},
    {time:['09:30', '10:00'], booking: null, clash: false},
    {time:['10:00', '10:30'], booking: null, clash: false},
    {time:['10:30', '11:00'], booking: null, clash: false},
    {time:['11:00', '11:30'], booking: null, clash: false},
    {time:['11:30', '12:00'], booking: null, clash: false},
    {time:['12:00', '12:30'], booking: null, clash: false},
    {time:['12:30', '13:00'], booking: null, clash: false},
    {time:['13:00', '13:30'], booking: null, clash: false},
    {time:['13:30', '14:00'], booking: null, clash: false},
    {time:['14:00', '14:30'], booking: null, clash: false},
    {time:['14:30', '15:00'], booking: null, clash: false},
    {time:['15:00', '15:30'], booking: null, clash: false},
    {time:['15:30', '16:00'], booking: null, clash: false},
    {time:['16:00', '16:30'], booking: null, clash: false},
    {time:['16:30', '17:00'], booking: null, clash: false}
  ]

    const format = 'HH:mm'

    props.bookings.forEach((booking, index) => {
      let startTime = moment(booking.startTime)
      let endTime = moment(moment(booking.endTime).format('HH:mm'))
        timeSlots.forEach((timeSlot, index) => {
        let slotStart = moment(timeSlot.time[0], format)
        let slotEnd = moment(timeSlot.time[1], format)
        if(startTime._i.includes(slotStart._i)){
          timeSlot.booking = booking
          timeSlots[index].time[1] = endTime._i
          if(endTime._i > slotEnd._i){
            timeSlots[index].time[1] = endTime._i
            if(timeSlots[index +1].booking == null){
              timeSlots.splice(index +1, 1)
            } else {
              timeSlots[index].clash = true
              timeSlots[index +1].clash = true
            }
          }
        }
      })
    })


    const slots = timeSlots.map((slot, index) => {
      return <TimeSlot key={index} slot={slot} />
    })

const niceDate = moment(props.date).format('ll')

    return(
      <div className="">
        <h3>{props.barber} - {niceDate}</h3>
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
