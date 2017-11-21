import React, { Component } from 'react';
import PollApi from '../api/pollApi';
import PollForm from './PollForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import Toastr from 'toastr';

class PollEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      updatedPoll: {
        published: true,
        themes: [],
        options: {
          a: null,
          b: null,
          c: null,
          d: null,
        },
        responses: {
          a: [],
          b: [],
          c: [],
          d: [],
        }
      },
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentWillMount(){
    // Update state with selected poll data, populating form
    PollApi.getSinglePoll(this.props.match.params.id, (err, poll)=>{
      if(err){
      } else {
        this.setState({
          updatedPoll: poll,
          isBlocking: false
         });
      }
    })
  }

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedPoll;
    this.setState({
      updatedPoll: temp,
      isBlocking: true
     });
  };


  handleOptionsChange(e) {
    var temp = this.state.updatedPoll;
    temp.options[e.target.name] = e.target.value;
    temp.responses[e.target.name] = e.target.value;
    this.setState({
      updatedPoll: temp,
      isBlocking: true
     });
  };


  handleCheckboxChange(e) {
    const temp = this.state.updatedPoll;
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
      updatedPoll: temp,
      isBlocking: true
     });
  }


  handleSubmit(e){
    e.preventDefault();
    // Prepare the updated poll payload, inserting the new content from Quill
    var payload = this.state.updatedPoll;
    payload.content = this.state.content;

    // Make API call
    PollApi.updatePoll(this.props.match.params.id, payload, (err, updatedPoll)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${updatedPoll.question}</strong> has been successfully updated.`);
        // We are no longer blocked
        this.setState({
          isBlocking: false
        });
      }
    })
  };

  // Delete the selected poll
  handleDelete(){
    var response = window.confirm("Are you sure you want to permenantly delete this poll?");
    if (response == true) {
      PollApi.deletePoll(this.props.match.params.id, (err, deletedPoll)=>{
        if(err){
          Toastr.error("Whoops, there was an error: " + err.status);
        } else {
          // Toast notification
          Toastr.success(`That poll has been successfully deleted.`);
          // Go back to the list
          this.props.history.push('/polls')
        }
      })
    }
  }

  render() {
    const isBlocking = this.state.isBlocking;

    return (
      <div>
        <Prompt when={isBlocking} message="You may have unsaved changes. Are you sure you want to leave?" />
        <div className="container">
          <div className="page-header">
            <h1>Edit poll</h1>
          </div>
        </div>
        <Grid>
          <PollForm
            newEvent={this.state.updatedPoll}
            handleChange={this.handleChange}
            handleCheckboxChange={this.handleCheckboxChange}
            handleOptionsChange={this.handleOptionsChange}
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

export default PollEdit;
