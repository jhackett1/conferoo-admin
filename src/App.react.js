import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Header from './partials/Header.react';
import Footer from './partials/Footer.react';
import Login, {authentication} from './login/Login.react';
import Dashboard from './dashboard/Dashboard.react';
import EventList from './events/EventList.react';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/events" component={EventList}/>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
