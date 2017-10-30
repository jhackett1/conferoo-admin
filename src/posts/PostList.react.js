import React, { Component } from 'react';
import PostApi from '../api/postApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PostItem from './PostItem.react';

class PostList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    PostApi.getPostsList((err, list)=>{
      if(err) console.log(err);
      this.setState({posts: list})
    })
  }


  render() {
    // Create list elements
    const List = this.state.posts.map((post) => {
      return(
        <PostItem key={post._id} post={post}/>
      )
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/posts/new" className="btn btn-primary">New post</Link>
            </div>
          </div>
          <h1>All posts</h1>
        </div>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default PostList;
