import React from 'react';
import SuggestionInputSearch from 'suggestion-react-input-search';
import Modal from 'react-modal';
import moment from 'moment';
import './BookingForm.css'

Modal.setAppElement('#root')

class BookingForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      customer: '',
      modalIsOpen: false
    }
  }

   handleCustomerSubmit = (term) => {
    const splitTerm = term.split(' ')
    const foundCustomer = this.props.customers.find(customer => {
      return customer.firstName === splitTerm[0].charAt(0).toUpperCase() + splitTerm[0].slice(1) && customer.lastName === splitTerm[1].charAt(0).toUpperCase() + splitTerm[1].slice(1) && customer.phoneNo === splitTerm[2];
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
    this.forceUpdate()
    localStorage.setItem("currentBarber", this.props.bookingCriteria.barber.name)
    localStorage.setItem("date", this.props.bookingCriteria.date)
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  registerCustomer = (evt) => {
    evt.preventDefault()
    const customer = {
      "firstName": evt.target.firstName.value,
      "lastName": evt.target.lastName.value,
      "phoneNo": evt.target.phoneNo.value
    }
    this.props.registerCustomer(customer)
    this.closeModal()
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

    const customersNames = customers.map(customer => {
      return `${customer.firstName} ${customer.lastName} ${customer.phoneNo}`
    })


    return(
      <div className="booking-register-container">
        <div className="booking-form">
          <p>Barber: {bookingCriteria.barber.name}</p>
          <p>Date: {niceDate}</p>
          <form onSubmit={this.handleFormSubmit}>
            <select name="startTime">
              {slotStart}
            </select>
            <select name="service" className="service-select">
              {serviceOptions}
            </select>
            <SuggestionInputSearch
              onSubmitFunction={this.handleCustomerSubmit}
              recentSearches={customersNames}
              placeholder="Search customers..."
              className="customer-search"
            />
            <button className="booking-form-btn" type="submit">Book</button>
          </form>
        </div>
        <div className="modal-container">
          <button className="register-customer-btn" onClick={this.openModal}>Register New Customer</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            className="modal"
          >
            <div className="modal-content">
              <button className="modal-close" onClick={this.closeModal}>X</button>
              <h3 className="modal-header">Register New Customer</h3>
              <form className="register-form" onSubmit={this.registerCustomer}>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName"/>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName"/>
                <label htmlFor="phoneNo">Phone No.:</label>
                <input type="text" id="phoneNo"/>
                <button className="register-form-btn" type="submit">Register</button>
              </form>
            </div>
          </Modal>
        </div>
      </div>

    )
  }
}


export default BookingForm
