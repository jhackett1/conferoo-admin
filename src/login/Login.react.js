import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap';

const clientId = "826165205387-b4u0mtq8diena38nabgqrd667kefjnfr.apps.googleusercontent.com";

class Login extends Component {
  render() {

    function handleClick(){
      var urlBuilder = [];
      urlBuilder.push('response_type=code', `client_id=${clientId}`, `redirect_uri=${window.location.origin}`, 'scope=profile email');
      const url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join('&');
      // Open the popup window
      window.location.href = url;
    }

    return (
      <Row className="show-grid">
        <Col md={2}></Col>
        <Col md={8}>
          <Jumbotron className="text-center">
            <h1>Conferoo Publisher</h1>
            <p class="lead">Log in for conference organisers</p>
            <Button type="button" onClick={handleClick} className="btn btn-primary"><Glyphicon glyph="google" /> Log in with Google</Button>
          </Jumbotron>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

// Handle sign in/out methods and keep track of user's login state
const authentication = {
  isLoggedin: false,
  login(){
    // isLoggedin = true;
  },
  logout(){
    // isLoggedin = false;
  }
}

export { authentication }
export default Login;
