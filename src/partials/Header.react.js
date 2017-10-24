import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">Conferoo Publisher</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/about">About</Link></li>            
        </Nav>
        <Nav className='navbar-right'>
            <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
