import React, { Component } from 'react';
import SpeakerApi from '../api/speakerApi';
import {Redirect} from 'react-router-dom';
import 'toastr/build/toastr.css';
import Toastr from 'toastr';
import SpeakerForm from './SpeakerForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';

class SpeakerNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      newSpeaker: {
        published: true
      },
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  handleMediaChange(e) {
    var temp = this.state.newSpeaker;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.preview = e.preview;
    this.setState({
      newSpeaker: temp,
      isBlocking: true
     });
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.newSpeaker;
    // Support image picker
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      newSpeaker: temp,
      isBlocking: true
     });
  };

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    // Make API call
    SpeakerApi.createSpeaker(this.state.newSpeaker, (err, newSpeaker)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`${newSpeaker.name} has been successfully created.`);
        // We are no longer blocked
        var temp = this.state.newSpeaker;
        this.setState({
          newSpeaker: temp,
          isBlocking: false,
          redirect: "/speakers/edit/" + newSpeaker._id
        });
      }
    })
  };

  render() {
    const isBlocking = this.state.isBlocking;

    if(!this.state.redirect === false){
      return(
        <Redirect to={this.state.redirect} />
      );
    } else {
      return (
        <div>
          <Prompt when={isBlocking} message="You have unsaved changes. Are you sure you want to leave?" />
          <div className="container">
            <div className="page-header">
              <h1>New speaker</h1>
            </div>
          </div>
          <Grid>
            <SpeakerForm
              newSpeaker={this.state.newSpeaker}
              handleChange={this.handleChange}
              handleMediaChange={this.handleMediaChange}
              handleSubmit={this.handleSubmit}
              isBlocking={this.state.isBlocking}
              mode="new"
            />
          </Grid>
        </div>
      );
    }

  }
}

export default SpeakerNew;
