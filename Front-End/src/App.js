import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './containers/Main';
import BookingContainer from './containers/BookingContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router >
          <React.Fragment>
            <Main />
            <Switch>
              <Route exact path = '/bookings' component={BookingContainer}/>
          </Switch>
        </React.Fragment>
      </Router>
      </div>
    );
  }
}

export default App;
