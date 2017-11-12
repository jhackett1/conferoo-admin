import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

class LoginCallback extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
    this.postAccessCode = this.postAccessCode.bind(this);
  };

  // Now send the auth code to the server via HTTP post
  postAccessCode = (code) => {
    var postData = code;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      var status = request.status;
      if(request.readyState === 4){
        // If authentication was successful, save the token
        if(status===200){
          var data = JSON.parse(request.responseText);
          UserService.saveToken(data.token);
          UserService.saveProfile(data);
          Toastr.success(`You are logged in as ${data.displayname}`);
          this.setState({
            redirect: '/'
          })
        // If authentication fails
        } else if(status===401) {
          var data = JSON.parse(request.responseText);
          Toastr.error(data.message);
          this.setState({
            redirect: '/login'
          })
        // For all other errors
        } else {
          Toastr.error(`Trouble communicating with server. Please try again later.`)
          this.setState({
            redirect: '/login'
          })
        }
      }
    }.bind(this);
    request.open('POST', config.api_host + config.api_path + '/authenticate');
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({
      code: postData,
      redirectUri: config.publisher_host + '/login/callback',
      clientId: config.google_client_id
    }));
  }

  componentWillMount(){

    // Check whether we have an access code, and if we have it, post it to the Conferoo server
    if(window.location.search.substring(1)){
      // Process the auth code
      var params = window.location.search.substring(1);
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);
      // Send the code onto the backend server and save the token on the client
      this.postAccessCode(code);
    }
  }

  render() {
    if(!this.state.redirect === false){
        return (
          <Redirect to={this.state.redirect} />
        );
    } else {
        return(
          <div className="container text-center">
            <p>Logging you in...</p>
          </div>
        );
    }

  }
}

export default LoginCallback;
