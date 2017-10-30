import React, { Component } from 'react';
import Humandate from 'human-date';
import {Link} from 'react-router-dom';

class PostItem extends Component {

  render() {

    const post = this.props.post;

    return (
      <Link to={"/posts/edit/" + post._id} key={post._id} className="list-group-item">
        <div className="media">
          <div className="media-left media-middle">
             <img className="media-object" src={post.image}/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{post.title}</h4>
          <p className="list-group-item-text">{post.teaser}</p>
          <small>{Humandate.relativeTime(post.createdAt)}</small>
          </div>
        </div>
      </Link>
    );
  }
}

export default PostItem;
