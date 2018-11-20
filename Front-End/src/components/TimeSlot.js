import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './TimeSlot.css';

const TimeSlot = (props) => {

  const {time, booking, clash} = props.slot
  const startTime = time[0]
  const endTime = time[1]

  function submit(){
    confirmAlert({
      title: 'Confirm to delte booking',
      message: 'Are you sure you wish to delete this booking?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete()
        },
        {
          label: 'No',
          onClick: () => window.location ='/'
        }
      ]
    })
  };

  function onDelete(){
    props.delete(booking.id)
  }

  if(booking != null){

    return(
      <div className={`timeslot timeslot--schedule-clash-${clash}`}>
        <span className="timeslot--time">{startTime} - {endTime}</span><span className="timeslot--customer">{booking.customer.name}</span><button className="timeslot--delete-btn" onClick={submit}></button><span className="timeslot--service">{booking.service.name}</span>
      </div>
    )
  } else {
    return (
      <div className="timeslot">
        <span className="timeslot--time">{startTime} - {endTime}</span>
      </div>
    )
  }
}


export default TimeSlot;
