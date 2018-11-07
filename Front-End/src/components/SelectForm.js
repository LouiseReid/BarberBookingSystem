import React from 'react';

class SelectForm extends React.Component {
  constructor(props){
    super();
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt){
    this.props.onChange(evt.target.value)
  }


  render(){
    const options = this.props.barbers.map((barber, index)=>{
      return <option key={index} value={barber.name}>{barber.name}</option>
    })

    return (
      <form>
        <fieldset className="fields">
          <select onChange={this.handleChange}>
            {options}
          </select>
        </fieldset>
       </form>
    )
  }
}

export default SelectForm
