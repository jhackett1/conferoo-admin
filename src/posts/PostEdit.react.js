import React, { Component } from 'react';
import PostApi from '../api/postApi';
import PostForm from './PostForm.react';
import {Grid} from 'react-bootstrap';
import {Prompt} from 'react-router-dom';
import Toastr from 'toastr';

class PostEdit extends Component {
  // Initial state
  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      redirect: false,
      updatedPost: {
        published: true
      },
      content: '',
      isBlocking: false
    };
    // Bind functions to this
    this.handleChange = this.handleChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
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
      }
    })
  }

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    var temp = this.state.updatedPost;
    temp[e.target.name] = e.target.value;
    this.setState({
      updatedPost: temp,
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
    e.preventDefault();
    // Prepare the updated post payload, inserting the new content from Quill
    var payload = this.state.updatedPost;
    payload.content = this.state.content;

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
        <Prompt when={isBlocking} message="You may have unsaved changes. Are you sure you want to leave?" />
        <div className="container">
          <div className="page-header">
            <h1>Edit post</h1>
          </div>
        </div>
        <Grid>
          <PostForm
            newPost={this.state.updatedPost}
            handleChange={this.handleChange}
            quillValue={this.state.content}
            handleQuillChange={this.handleQuillChange}
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
