import React from 'react';
import SuggestionInputSearch from 'suggestion-react-input-search';
import moment from 'moment';
import './BookingForm.css'

class BookingForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      customer: ''
    }
  }

   handleOnSubmit = (term) => {
    const foundCustomer = this.props.customers.find(customer => {
      return customer.name === term.charAt(0).toUpperCase() + term.slice(1);
    })
    this.setState({customer: foundCustomer._links.self.href})
  }

   handleFormSubmit = (evt) => {
    evt.preventDefault()
    const booking = {
      "startTime": `${this.props.bookingCriteria.date}T${evt.target.startTime.value}`,
      "barber": this.props.bookingCriteria.barber.url,
      "service": evt.target.service.value,
      "customer": this.state.customer
    }
    this.props.submitBooking(booking)
    localStorage.setItem("currentBarber", this.props.bookingCriteria.barber.name)
    localStorage.setItem("date", this.props.bookingCriteria.date)
  }


  render(){
    const {bookingCriteria, customers, services} = this.props;

    if(bookingCriteria.barber === null) return null;

    const niceDate = moment(bookingCriteria.date).format('ll')

    const slotStart = bookingCriteria.availableSlots.map((time, index) => {
      return <option key={index} value={time.time[0]}>{time.time[0]}</option>
    })

    const serviceOptions = services.map((service, index) => {
      return <option key={index} value={service._links.self.href}>{service.name}</option>
    })

    const customersNames = customers.map(customer => customer.name)


    return(
      <div className="booking-form">
        <p>Barber: {bookingCriteria.barber.name}</p>
        <p>Date: {niceDate}</p>
        <form onSubmit={this.handleFormSubmit}>
          <select name="startTime">
            {slotStart}
          </select>
          <select name="service">
            {serviceOptions}
          </select>

          <SuggestionInputSearch
            onSubmitFunction={this.handleOnSubmit}
            recentSearches={customersNames}
            placeholder="Search customers"
          />
          <button className="booking-form-btn" type="submit">Book</button>
        </form>
      </div>
    )
  }
}


export default BookingForm
