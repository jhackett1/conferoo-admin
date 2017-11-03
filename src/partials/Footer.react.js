import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid text-center">
        <p>Conferoo Publisher 0.1 / <a target="blank" href="https://github.com/jhackett1/conferoo-publisher">Built with love</a></p>
      </footer>
    );
  }
}

export default Footer;
