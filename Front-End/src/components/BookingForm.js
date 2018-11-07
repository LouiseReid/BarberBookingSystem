import React from 'react';

class BookingForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      barber: null,
      date: new Date()
    }
  }

  handleBarberChange = evt => {
    const {options, selectedIndex} = evt.target;
    this.setState({barber: options[selectedIndex].text})
  }

  handleDateChange = evt => {
    this.setState({date: evt.target.value})
  }



  handleSubmit = evt => {
    evt.preventDefault();
    this.props.handleSearch(this.state.barber, this.state.date)
    this.setState({
      barber: null,
      date: new Date()
    })
    // const booking = {
    //   "startTime": evt.target.startTime.value,
    //   "service": evt.target.service.value,
    //   "barber": evt.target.barber.value,
    //   "customer": evt.target.customer.value
    // }
    // this.props.handleBookingPost(booking);
  }

  render(){

    const barbers = this.props.barbers.map((barber, index) => {
      return <option key={index}
        value={barber._links.self.href}>{barber.name}</option>
      })

      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="barber">Barber: </label>
            <select id="barber" onChange={this.handleBarberChange}>
              <option>Select Barber</option>
              {barbers}
            </select>
            <label htmlFor="date">Date: </label>
            <input id="date" type="date" onChange={this.handleDateChange}></input>
            <button type="submit">Search</button>
          </form>
        </div>
      )
    }

  }

  export default BookingForm
