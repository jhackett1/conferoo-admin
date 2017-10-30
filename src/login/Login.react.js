import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Glyphicon } from 'react-bootstrap';
import config from '../config';

class Login extends Component {

  //Send user to Google on click
  handleClick(){
    var urlBuilder = [];
    urlBuilder.push('response_type=code', `client_id=${config.google_client_id}`, `redirect_uri=${window.location.origin}/login/callback`, 'scope=profile email');
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlBuilder.join('&');
    // Open the popup window
    window.location.href = url;
  }

  render() {
    return (
      <div className="container">
        <Row className="show-grid">
          <Col md={2}></Col>
          <Col md={8}>
            <Jumbotron className="text-center">
              <h1>Conferoo Publisher</h1>
              <p className="lead">Log in for conference organisers</p>
              <Button type="button" onClick={this.handleClick} className="btn btn-primary"><Glyphicon glyph="google" /> Log in with Google</Button>
            </Jumbotron>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    );
  }
}

export default Login;
