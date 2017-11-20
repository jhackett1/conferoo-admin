import React, { Component } from 'react';
import PostApi from '../api/postApi';
import PostForm from './PostForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import Toastr from 'toastr';
import tinymce from 'tinymce';

class PostEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      updatedPost: {
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
    // Update state with selected post data, populating form
    PostApi.getSinglePost(this.props.match.params.id, (err, post)=>{
      if(err){
      } else {
        this.setState({
          updatedPost: post,
          content: post.content,
          isBlocking: false
         });
         tinymce.activeEditor.setContent(this.state.content);
      }
    })
  }

  handleMediaChange(e) {
    var temp = this.state.updatedPost;
    // Support image and speaker pickers
    temp.image = e.chosenMedia;
    temp.medium = e.medium;    
    temp.preview = e.preview;
    this.setState({
      updatedPost: temp,
      isBlocking: true
     });
  };
  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedPost;
    // Support image and speaker pickers
    if(e.mediaPicker){
      temp.image = e.chosenMedia;
    } else if (e.speakerPicker) {
      temp.author = e.chosenSpeaker;
    } else {
      temp[e.target.name] = e.target.value;
    }
    this.setState({
      updatedPost: temp,
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
    const temp = this.state.updatedPost;
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
      updatedPost: temp,
      isBlocking: true
     });
  }

  handleSubmit(e){
    e.preventDefault();
    // Prepare the updated post payload
    var payload = this.state.updatedPost;
    payload.content = tinymce.activeEditor.getContent();
    // Make API call
    PostApi.updatePost(this.props.match.params.id, payload, (err, updatedPost)=>{
      if(err){
        Toastr.error("Whoops, there was an error: " + err.status);
      } else {
        // Toast notification
        Toastr.success(`<strong>${updatedPost.title}</strong> has been successfully updated.`);
        // We are no longer blocked
        this.setState({
          isBlocking: false
        });
      }
    })
  };

  // Delete the selected post
  handleDelete(){
    var response = window.confirm("Are you sure you want to permenantly delete this post?");
    if (response == true) {
      PostApi.deletePost(this.props.match.params.id, (err, deletedPost)=>{
        if(err){
          Toastr.error("Whoops, there was an error: " + err.status);
        } else {
          // Toast notification
          Toastr.success(`That post has been successfully deleted.`);
          // Go back to the list
          this.props.history.push('/posts')
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
            <h1>Edit post</h1>
          </div>
        </div>
        <Grid>
          <PostForm
            newPost={this.state.updatedPost}
            handleChange={this.handleChange}
            handleTinyMCEChange={this.handleTinyMCEChange}
            handleMediaChange={this.handleMediaChange}
            handleCheckboxChange={this.handleCheckboxChange}
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

export default PostEdit;
