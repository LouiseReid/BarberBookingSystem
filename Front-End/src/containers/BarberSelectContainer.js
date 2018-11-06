import React from 'react';
import Request from '../helpers/request';
import SelectForm from '../components/SelectForm'


class BarberSelectContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      barbers: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(barber){
    this.props.handleSelectChange(barber)
  }

  componentDidMount(){
    let request = new Request()
    request.get('/api/barbers').then((data) => {
      this.setState({barbers: data._embedded.barbers})
    })
  }

  render(){
    return(
      <SelectForm barbers={this.state.barbers} onSelectChange={this.handleChange}/>
    )
  }
}

export default BarberSelectContainer;
