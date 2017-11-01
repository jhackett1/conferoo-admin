import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Image} from 'react-bootstrap';
import UserService from '../UserService';


class Header extends Component {

  render() {

    const Button = withRouter(({ history }) => (

      UserService.checkToken() ? (
        <li className="logout-items">
          <a onClick={() => {
                        UserService.removeToken();
                        history.push('/');
                      }}>
            <span className="glyphicon glyphicon-log-out"></span> Log Out
            <Image className="profile-thumbnail" src={UserService.getProfile().image} circle/>
          </a>
        </li>
      ) : (
        <li>
          <Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log In</Link>
        </li>
      )
    ))


    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">Conferoo Publisher</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/speakers">Speakers</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/media">Media</Link></li>
            <li><Link to="/users">Users</Link></li>            
            <li><Link to="/about">About</Link></li>
        </Nav>
        <Nav className='navbar-right'>
            <Button/>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
