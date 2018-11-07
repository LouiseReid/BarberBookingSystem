import React from 'react';
import Calendar from 'react-calendar';
import BookingContainer from './BookingContainer';
import moment from 'moment'

class Main extends React.Component{
  state = {
    date: new Date(),
  }

  dateSelect = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    this.setState({date: formattedDate})
  };

  handleSelectChange = barber => {
    this.setState({barber: barber})
  }


  render(){
    return (
      <React.Fragment>
        <Calendar onChange={this.dateSelect}/>
        <BookingContainer
          selectedDate={this.state.date}/>
      </React.Fragment>
    );
  }
}

export default Main;
