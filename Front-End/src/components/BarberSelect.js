import React from 'react';
import './BarberSelect.css';

const BarberSelect = (props) => {

  const options = props.barbers.map((barber, index)=>{
    return <button key={index} value={barber.name} className="barber-select-btn" onClick={handleChange}>{barber.name}</button>
  })

  function handleChange(evt){
    props.onChange(evt.target.value)
  }

  return (
    <div className="barber-select-btn-container">
      {options}
    </div>
  )
}

export default BarberSelect
