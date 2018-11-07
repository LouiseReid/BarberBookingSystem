import React from 'react';
import Request from '../helpers/request';
import Schedule from '../components/Schedule';
import SelectForm from '../components/SelectForm'
import BookingForm from '../components/BookingForm'

class BookingContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookings: [],
      services: [],
      customers: [],
      barbers: [],
      currentBarber: 'Gemma'
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


  render(){
    const bookingsForDate = this.state.bookings.filter(booking => booking.startTime.includes(this.props.selectedDate) && booking.barber.name === this.state.currentBarber)

    return(
      <React.Fragment>
        <SelectForm barbers={this.state.barbers} onChange={this.handleSelectChange}/>
        <Schedule bookings={bookingsForDate} barber={this.state.barber} />
        <BookingForm
          barbers = {this.state.barbers}
          services = {this.state.services}
          customers = {this.state.services}
          handleBookingPost= {this.handleBookingPost} />
        </React.Fragment>
      )
    }
  }

  export default BookingContainer;
