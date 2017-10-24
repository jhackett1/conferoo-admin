import React, { Component } from 'react';

class App extends Component {
  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>About</h1>
        </div>
        <p>This React/Flux application is part of a Conferoo paperless conference platform.</p>
        <p>To use Conferoo, you must set up at least one client application, in addition to this admin app and the core app.</p>
        <p>Conferoo was built by Joshua Hackett, Adam Robertson & co. For more info, email hello@joshuahackett.com</p>
      </div>
    );
  }
}

export default App;
