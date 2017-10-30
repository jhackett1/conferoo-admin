import React, { Component } from 'react';
import PostApi from '../api/postApi';
import {Redirect} from 'react-router-dom';
import Toastr from 'toastr';
import PostForm from './PostForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';

class PostNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      newPost: {
        published: 'public'
      },
      content: '',
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.newPost;
    temp[e.target.name] = e.target.value;
    this.setState({
      newPost: temp,
      isBlocking: true
     });
  };
  // Save Quill changes to a higher order key of state, to prevent converting the value from a Delta to a string, which breaks Quill
  handleQuillChange(value){
    this.setState({
      content: value,
      isBlocking: true
    });
  }

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    //Add content from Quill into the content to post, along with the date of creation
    var newPost = this.state.newPost;
    newPost.content = this.state.content;
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
              handleQuillChange={this.handleQuillChange}
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
