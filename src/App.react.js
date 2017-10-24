import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import Header from './partials/Header.react';
import Footer from './partials/Footer.react';
import Login from './login/Login.react';
import Dashboard from './dashboard/Dashboard.react';
import About from './about/About.react';

import EventList from './events/EventList.react';
import EventNew from './events/EventNew.react';
import EventEdit from './events/EventEdit.react';

class App extends Component {
  render() {

    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Dashboard}/>
          <Route path="/login" component={Login}/>

          <Switch>
            <Route path="/events/new" component={EventNew}/>
            <Route path="/events/edit/:id" component={EventEdit}/>
            <Route path="/events" component={EventList}/>
          </Switch>

          <Route path="/about" component={About}/>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
