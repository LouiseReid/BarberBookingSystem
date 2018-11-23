import React from 'react';
import Request from '../helpers/request';
import Schedule from '../components/Schedule';
import BarberSelect from '../components/BarberSelect';
import BookingForm from '../components/BookingForm';
import BarberBookingSearch from '../components/BarberBookingSearch';
import DailyTimeTable from '../components/DailyTimeTable';
import Calendar from 'react-calendar';
import moment from 'moment';
import './BookingContainer.css'

class BookingContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookings: [],
      services: [],
      customers: [],
      barbers: [],
      timeSlots: [
        {time:['09:00','09:30']},
        {time:['09:30', '10:00']},
        {time:['10:00', '10:30']},
        {time:['10:30', '11:00']},
        {time:['11:00', '11:30']},
        {time:['11:30', '12:00']},
        {time:['12:00', '12:30']},
        {time:['12:30', '13:00']},
        {time:['13:00', '13:30']},
        {time:['13:30', '14:00']},
        {time:['14:00', '14:30']},
        {time:['14:30', '15:00']},
        {time:['15:00', '15:30']},
        {time:['15:30', '16:00']},
        {time:['16:00', '16:30']},
        {time:['16:30', '17:00']}
      ],
      currentBarber: localStorage.getItem("currentBarber") || "Gemma",
      date: localStorage.getItem("date") || new Date(),
      bookingsForDate: [],
      bookingCriteria: {
        availableSlots: [],
        date: new Date(),
        barber: null
      }
    }
  }


  componentDidMount(){
    const request = new Request()
    request.get('/api/bookings').then((data) => {
      this.setState({bookings: data._embedded.bookings})
      this.getBookingsForDate__wBarber()
    })

    const request2 = new Request();
    request2.get("/api/customers").then((data) => {
      this.setState({customers: data._embedded.customers})
    });

    const request3 = new Request();
    request3.get("/api/services").then((data) => {
      this.setState({services: data._embedded.services})
    });

    const request4 = new Request();
    request4.get("/api/barbers").then((data) => {
      this.setState({barbers: data._embedded.barbers})
    });

    const formattedDate = moment(this.state.date).format('YYYY-MM-DD')
    this.setState({date: formattedDate})

  }

  handleSelectChange = currentBarber => {
    this.setState({currentBarber}, this.getBookingsForDate__wBarber)
    localStorage.setItem("currentBarber", currentBarber)
  }

  handleBookingPost = booking => {
    const request = new Request();
    request.post('/api/bookings/new', booking).then(() => {
      window.location = '/'
    })
  }

  handCustomerPost = customer => {
    const request = new Request();
    request.post('/api/customers', customer).then(() => {
      window.location = '/'
    })
  }

  dateSelect = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    this.setState({date: formattedDate}, this.getBookingsForDate__wBarber)
  };

  searchAvailableSlots = (barber, date) => {
    if(barber === null || barber.name === null){
      return false;
    }
    const barbersBookings = this.state.barbers.find(barb => barb.name === barber.name)
    const unavailableTimes = []
    barbersBookings.bookings.forEach((booking) => {
      if(booking.startTime.includes(moment(date).format('YYYY-MM-DD')) || booking.endTime.includes(moment(date).format('YYYY-MM-DD'))){
        unavailableTimes.push(booking)
      }
    })
    this.setState(prevState => ({
      bookingCriteria: {
        ...prevState.bookingCriteria, barber, date
      }
    }))
    this.filterUnavailableTimes(unavailableTimes)
  }

  filterUnavailableTimes = slots => {
    if(slots[0] === undefined || slots.length === 0){
      this.setState(prevState => ({
        bookingCriteria: {
          ...prevState.bookingCriteria,
          availableSlots: this.state.timeSlots
        }
      }))
    } else {
      const timesToRemove = []
      this.state.timeSlots.forEach((slot, index) => {
        slots.forEach((unavailable) => {
          if(unavailable.startTime.includes(slot.time[0])){
            timesToRemove.push(slot)
            if(unavailable.endTime.slice(-8) > slot.time[1] &&unavailable.endTime.slice(-8).substring(0, 5) !== slot.time[1]){
              const rolledIntoSlot = this.state.timeSlots[index +1]
              timesToRemove.push(rolledIntoSlot)
            }
          }
        })
      })
      const availableSlots = this.state.timeSlots.filter((timeSlot) => {
        return timesToRemove.indexOf(timeSlot) === -1
      })
      this.setState(prevState => ({
        bookingCriteria: {
          ...prevState.bookingCriteria, availableSlots
        }
      }))
    }
  }

  getBookingsForDate__wBarber = () => {
    const bookingsForDate = this.state.bookings.filter(booking => booking.startTime.includes(this.state.date) && booking.barber.name === this.state.currentBarber)
    this.setState({bookingsForDate})
  }


  render(){

    const dailyBookings = this.state.bookings.filter(booking => booking.startTime.includes(this.state.date));

    return(
      <div className="main-container">
        <div className="cal-container">
          <Calendar onChange={this.dateSelect}/>
          <DailyTimeTable bookings={dailyBookings} date={this.state.da}/>
        </div>
        <div className="booking-container">
          <div className="individual-schedule-container">
            <BarberSelect barbers={this.state.barbers} onChange={this.handleSelectChange}/>
            <Schedule
              date={this.state.date}
              bookings={this.state.bookingsForDate}
              barber={this.state.currentBarber}
              timeSlots={this.state.timeSlots}
            />
          </div>
          <div className="process-booking-container">
            <BarberBookingSearch
              barbers = {this.state.barbers}
              handleSearch = {this.searchAvailableSlots}
            />
            <BookingForm
              bookingCriteria = {this.state.bookingCriteria}
              services = {this.state.services}
              customers = {this.state.customers}
              submitBooking = {this.handleBookingPost}
              registerCustomer = {this.handCustomerPost}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default BookingContainer;
