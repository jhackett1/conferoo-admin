import React, { Component } from 'react';
import SpeakerApi from '../api/speakerApi';
import SpeakerForm from './SpeakerForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import 'toastr/build/toastr.css';
import Toastr from 'toastr';

class SpeakerEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {};
    this.state.updatedSpeaker = {};
    this.state.isBlocking = false;
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentDidMount(){
    // Update state with selected speaker data, populating form
    SpeakerApi.getSingleSpeaker(this.props.match.params.id, (err, speaker)=>{
      if(err){
      } else {
        this.setState({
          updatedSpeaker: speaker,
          isBlocking: false
         });
      }
    })
  }


  handleMediaChange(e) {
    var temp = this.state.updatedSpeaker;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.preview = e.preview;
    temp.preview = e.preview;
    this.setState({
      updatedSpeaker: temp,
      isBlocking: true
     });
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedSpeaker;
    // Support image picker
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      updatedSpeaker: temp,
      isBlocking: true
     });
  };

  handleSubmit(e){
    e.preventDefault();
    // Make API call
    SpeakerApi.updateSpeaker(this.props.match.params.id, this.state.updatedSpeaker, (err, updatedSpeaker)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`${updatedSpeaker.name} has been successfully updated.`);
        // We are no longer blocked
        var temp = this.state.updatedSpeaker;
        this.setState({
          updatedSpeaker: temp,
          isBlocking: false
        });
      }
    })
  };

  // Delete the selected speaker
  handleDelete(){
    var response = window.confirm("Are you sure you want to parmenantly delete this speaker?");
    if (response == true) {
      SpeakerApi.deleteSpeaker(this.props.match.params.id, (err, deletedSpeaker)=>{
        if(err){
          Toastr.error("Whoops, there was an error: " + err.status);
        } else {
          // Toast notification
          Toastr.success(` has been successfully deleted.`);
          // Go back to the list
          this.props.history.push('/speakers')
        }
      })
    }
  }

  render() {
    const isBlocking = this.state.isBlocking;

    return (
      <div>
        <Prompt when={isBlocking} message="You have unsaved changes. Are you sure you want to leave?" />
        <div className="container">
          <div className="page-header">
            <h1>Edit speaker</h1>
          </div>
        </div>
        <Grid>
          <SpeakerForm
            newSpeaker={this.state.updatedSpeaker}
            handleMediaChange={this.handleMediaChange}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            isBlocking={this.state.isBlocking}
            handleDelete={this.handleDelete}
            mode="edit"
          />
        </Grid>
      </div>
    );
  }
}

export default SpeakerEdit;
