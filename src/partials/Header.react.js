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
            <Image className="profile-thumbnail" src={UserService.getProfile().image ? UserService.getProfile().image : '/user.png'} circle/>
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
        <Navbar.Brand>
          <Link to="/" className="navbar-brand"><img alt="Conferoo Publisher" src="/logo.png"/></Link>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/polls">Polls</Link></li>
              <li><Link to="/speakers">Speakers</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/pages">Pages</Link></li>
              <li><Link to="/media">Media</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/about">About</Link></li>
          </Nav>
          <Nav className='navbar-right'>
              <Button/>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle/>
      </Navbar>
    );
  }
}

export default Header;
