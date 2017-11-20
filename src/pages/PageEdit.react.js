import React, { Component } from 'react';
import PageApi from '../api/pageApi';
import PageForm from './PageForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import Toastr from 'toastr';
import tinymce from 'tinymce';

class PageEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      updatedPage: {
        published: true,
        themes: []
      },
      content: '',
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleTinyMCEChange = this.handleTinyMCEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  componentWillMount(){
    // Update state with selected page data, populating form
    PageApi.getSinglePage(this.props.match.params.id, (err, page)=>{
      if(err){
      } else {
        this.setState({
          updatedPage: page,
          content: page.content,
          isBlocking: false
         });
         tinymce.activeEditor.setContent(this.state.content);
      }
    })
  }

  handleMediaChange(e) {
    var temp = this.state.updatedPage;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.preview = e.preview;    
    temp.preview = e.preview;
    this.setState({
      updatedPage: temp,
      isBlocking: true
     });
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedPage;
    // Support image and speaker pickers
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else if (e.speakerPicker) {
      temp.author = e.chosenSpeaker;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      updatedPage: temp,
      isBlocking: true
     });
  };
  // Handle TinyMCE prompt
  handleTinyMCEChange(){
    this.setState({
      isBlocking: true
    });
  }
  handleCheckboxChange(e) {
    const temp = this.state.updatedPage;
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
      updatedPage: temp,
      isBlocking: true
     });
  }

  handleSubmit(e){
    e.preventDefault();
    // Prepare the updated page payload
    var payload = this.state.updatedPage;
    payload.content = tinymce.activeEditor.getContent();
    // Make API call
    PageApi.updatePage(this.props.match.params.id, payload, (err, updatedPage)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${updatedPage.title}</strong> has been successfully updated.`);
        // We are no longer blocked
        this.setState({
          isBlocking: false
        });
      }
    })
  };

  // Delete the selected page
  handleDelete(){
    var response = window.confirm("Are you sure you want to permenantly delete this page?");
    if (response == true) {
      PageApi.deletePage(this.props.match.params.id, (err, deletedPage)=>{
        if(err){
          Toastr.error("Whoops, there was an error: " + err.status);
        } else {
          // Toast notification
          Toastr.success(`That page has been successfully deleted.`);
          // Go back to the list
          this.props.history.push('/pages')
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
            <h1>Edit page</h1>
          </div>
        </div>
        <Grid>
          <PageForm
            newPage={this.state.updatedPage}
            handleChange={this.handleChange}
            handleTinyMCEChange={this.handleTinyMCEChange}
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

export default PageEdit;
