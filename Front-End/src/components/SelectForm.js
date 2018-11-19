import React from 'react';
import './SelectForm.css';

const SelectForm = (props) => {

  const options = props.barbers.map((barber, index)=>{
    return <option key={index} value={barber.name}>{barber.name}</option>
  })

  function handleChange(evt){
    props.onChange(evt.target.value)
  }

  return (
    <form className="barber-select">
      <span>View Daily Bookings for:</span>  <select onChange={handleChange}>
          {options}
        </select>
    </form>
  )
}

export default SelectForm
