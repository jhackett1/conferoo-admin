import React, { Component } from 'react';
import PostApi from '../api/postApi';
import {Redirect} from 'react-router-dom';
import Toastr from 'toastr';
import PostForm from './PostForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import tinymce from 'tinymce';

class PostNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      newPost: {
        published: 'public',
        themes: []
      },
      content: '',
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleTinyMCEChange = this.handleTinyMCEChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  handleMediaChange(e) {
    var temp = this.state.newPost;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.preview = e.preview;
    this.setState({
      newPost: temp,
      isBlocking: true
    });
    tinymce.activeEditor.setContent(this.state.content);
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.newPost;
    // Support image and speaker pickers
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else if (e.speakerPicker) {
      temp.author = e.chosenSpeaker;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      newPost: temp,
      isBlocking: true
     });
  };
  // Save Quill changes to a higher order key of state, to prevent converting the value from a Delta to a string, which breaks Quill
  handleTinyMCEChange(){
    this.setState({
      isBlocking: true
    });
  }
  handleCheckboxChange(e) {
    const temp = this.state.newPost;
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
      newPost: temp,
      isBlocking: true
     });
  }

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    //Add content from Quill into the content to post, along with the date of creation
    var newPost = this.state.newPost;
    newPost.content = tinymce.activeEditor.getContent();
    newPost.createdAt = new Date();
    // Make API call
    PostApi.createPost(newPost, (err, newPost)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${newPost.title}</strong> has been successfully created.`);
        // We are no longer blocked
        var temp = this.state.newPost;
        this.setState({
          newPost: temp,
          isBlocking: false,
          redirect: "/posts/edit/" + newPost._id
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
              <h1>New post</h1>
            </div>
          </div>
          <Grid>
            <PostForm
              newPost={this.state.newPost}
              handleChange={this.handleChange}
              quillValue={this.state.content}
              handleMediaChange={this.handleMediaChange}
              handleTinyMCEChange={this.handleTinyMCEChange}
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

export default PostNew;
