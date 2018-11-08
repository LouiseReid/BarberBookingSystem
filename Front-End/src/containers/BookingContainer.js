import React from 'react';
import Request from '../helpers/request';
import Schedule from '../components/Schedule';
import SelectForm from '../components/SelectForm';
import BookingForm from '../components/BookingForm';
import BarberBookingSearch from '../components/BarberBookingSearch';
import Calendar from 'react-calendar';
import moment from 'moment';

class BookingContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookings: [],
      services: [],
      customers: [],
      barbers: [],
      timeSlots: [
        {time:['09:00','09:30'], booking: null},
        {time:['09:30', '10:00'], booking: null},
        {time:['10:00', '10:30'], booking: null},
        {time:['10:30', '11:00'], booking: null},
        {time:['11:00', '11:30'], booking: null},
        {time:['11:30', '12:00'], booking: null},
        {time:['12:00', '12:30'], booking: null},
        {time:['12:30', '13:00'], booking: null},
        {time:['13:00', '13:30'], booking: null},
        {time:['13:30', '14:00'], booking: null},
        {time:['14:00', '14:30'], booking: null},
        {time:['14:30', '15:00'], booking: null},
        {time:['15:00', '15:30'], booking: null},
        {time:['15:30', '16:00'], booking: null},
        {time:['16:00', '16:30'], booking: null},
        {time:['16:30', '17:00'], booking: null}
      ],
      currentBarber: 'Gemma',
      date: new Date(),
      bookingCriteria: {
        availableSlots: [],
        date: new Date(),
        barber: null
      }
    }
  }

  componentDidMount(){
    let request = new Request()
    request.get('/api/bookings').then((data) => {
      this.setState({bookings: data._embedded.bookings})
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
  }

  handleSelectChange = currentBarber => {
    this.setState({currentBarber})
  }

  handleBookingPost = booking => {
    const request = new Request();
    request.post('/api/bookings', booking).then(() => {
      window.location = '/'
    })
  }

  dateSelect = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    this.setState({date: formattedDate})
  };

  searchAvailableSlots = (barber, date) => {
    if(barber === null || barber.name === null){
      return false;
    }
    const barbersBookings = this.state.barbers.find(barb => barb.name === barber.name)
    const unavailableTimes = barbersBookings.bookings.map((booking) => {
      if(booking.startTime.includes(moment(date).format('DD-MM-YY')) || booking.endTime.includes(moment(date).format('DD-MM-YY'))){
        return booking
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
      console.log(slots);
      this.state.timeSlots.forEach((slot, index)=>{
        slots.forEach(unavailable =>{
          if(unavailable.startTime.includes(slot.time[0])){
            const filtered = this.state.timeSlots.filter(timeSlot => timeSlot.time !== slot.time)
            if(unavailable.endTime.slice(-5) > slot.time[1]){
              filtered.splice(index, 1)
            }
            this.setState(prevState => ({
              bookingCriteria: {
                ...prevState.bookingCriteria,
                availableSlots: filtered
              }
            }))
          }
        })
      })
    }
  }

  render(){
    const bookingsForDate = this.state.bookings.filter(booking => booking.startTime.includes(this.state.date) && booking.barber.name === this.state.currentBarber)


    return(
      <React.Fragment>
        <Calendar onChange={this.dateSelect}/>
        <SelectForm barbers={this.state.barbers} onChange={this.handleSelectChange}/>
        <Schedule
          bookings={bookingsForDate}
          barber={this.state.currentBarber}
          timeSlots={this.state.timeSlots}
        />
        <BarberBookingSearch
          barbers = {this.state.barbers}
          handleSearch = {this.searchAvailableSlots}
        />
        <BookingForm
          bookingCriteria = {this.state.bookingCriteria}
        />

      </React.Fragment>
    )
  }
}

export default BookingContainer;
