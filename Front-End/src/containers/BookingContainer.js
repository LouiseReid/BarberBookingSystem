import React from 'react';
import Request from '../helpers/request';
import Schedule from '../components/Schedule';

class BookingContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      bookings: []
    }
  }

  componentDidMount(){
    let request = new Request()
    request.get('/api/bookings').then((data) => {
      this.setState({bookings: data._embedded.bookings})
    })
  }


  render(){
    const bookingsForDate = this.state.bookings.filter(booking => booking.startTime.includes(this.props.selectedDate) && booking.barber.name === this.props.barber)

    return(
      <Schedule bookings={bookingsForDate} barber={this.props.barber} />
    )
  }
}

export default BookingContainer;
