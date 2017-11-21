import React, { Component } from 'react';
import PollApi from '../api/pollApi';
import {Redirect} from 'react-router-dom';
import Toastr from 'toastr';
import PollForm from './PollForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';

class PollNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      newPoll: {
        published: 'active',
        themes: [],
        options: {
          a: null,
          b: null,
          c: null,
          d: null,
        },
        responses: {
          a: null,
          b: null,
          c: null,
          d: null,
        }
      },
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.newPoll;
    temp[e.target.name] = e.target.value;
    this.setState({
      newPoll: temp,
      isBlocking: true
     });
  };


    handleOptionsChange(e) {
      var temp = this.state.newPoll;
      temp.options[e.target.name] = e.target.value;
      temp.responses[e.target.name] = e.target.value;
      this.setState({
        newPoll: temp,
        isBlocking: true
       });
    };


  handleCheckboxChange(e) {
    const temp = this.state.newPoll;
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
      newPoll: temp,
      isBlocking: true
     });
  }

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    //Add content from Quill into the content to poll, along with the date of creation
    var newPoll = this.state.newPoll;
    newPoll.createdAt = new Date();
    // Make API call
    PollApi.createPoll(newPoll, (err, newPoll)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${newPoll.question}</strong> has been successfully created.`);
        // We are no longer blocked
        var temp = this.state.newPoll;
        this.setState({
          newPoll: temp,
          isBlocking: false,
          redirect: "/polls/edit/" + newPoll._id
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
              <h1>New poll</h1>
            </div>
          </div>
          <Grid>
            <PollForm
              newEvent={this.state.newPoll}
              handleChange={this.handleChange}
              quillValue={this.state.content}
              handleQuillChange={this.handleQuillChange}
              handleOptionsChange={this.handleOptionsChange}
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

export default PollNew;
