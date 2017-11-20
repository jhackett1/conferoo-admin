import React, { Component } from 'react';
import EventApi from '../api/eventApi';
import {Redirect} from 'react-router-dom';
import Toastr from 'toastr';
import EventForm from './EventForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';

class EventNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      newEvent: {
        published: 'public',
        themes: []
      },
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleMediaChange(e) {
    var temp = this.state.newEvent;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.preview = e.preview;
    temp.medium = e.medium;
    this.setState({
      newEvent: temp,
      isBlocking: true
     });
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.newEvent;
    // Support image and speaker pickers
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else if (e.speakerPicker) {
      temp.speaker = e.chosenSpeaker;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      newEvent: temp,
      isBlocking: true
     });
  };

  handleCheckboxChange(e) {
    const temp = this.state.newEvent;
    // current array of options
    const themes = temp.themes;
    let index;
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      themes.push(e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = themes.indexOf(e.target.value)
      themes.splice(index, 1)
    }
    temp.themes = themes;
    // update the state with the new array of options
    this.setState({
      updatedEvent: temp,
      isBlocking: true
     });
  }

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    //Add content from Quill into the content to event, along with the date of creation
    var newEvent = this.state.newEvent;
    newEvent.createdAt = new Date();
    // Make API call
    EventApi.createEvent(newEvent, (err, newEvent)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${newEvent.title}</strong> has been successfully created.`);
        // We are no longer blocked
        var temp = this.state.newEvent;
        this.setState({
          newEvent: temp,
          isBlocking: false,
          redirect: "/events/edit/" + newEvent._id
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
              <h1>New event</h1>
            </div>
          </div>
          <Grid>
            <EventForm
              newEvent={this.state.newEvent}
              handleChange={this.handleChange}
              handleMediaChange={this.handleMediaChange}
              handleCheckboxChange={this.handleCheckboxChange}
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

export default EventNew;
