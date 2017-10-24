import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid text-center">
        <p>Conferoo version 0.1 / <Link to="/">Built with love</Link></p>
      </footer>
    );
  }
}

export default Footer;
