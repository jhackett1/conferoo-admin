import React, { Component } from 'react';
import Humandate from 'human-date';
import {Link} from 'react-router-dom';
import config from '../config';

class PostItem extends Component {

  render() {

    const post = this.props.post;

    const DraftBadge = () => {
      if(post.published === 'private'){
        return (<span className="badge">Private</span>);
      } else {
        return null;
      }
    }

    const PreviewImage = () => {
      // Check whether the image is hosted on the API server first (i.e. does a preview exist?)
      if(post.image && post.image.startsWith(config.api_host)){
        // If so, take the supplied URL and fiddle it to return the preview instead
        var split = post.image.split('uploads');
        var previewImageURL = split[0] + 'uploads/previews' + split[1];
        return(
          <img className="media-object" src={previewImageURL}/>
        )
      } else {
        return(
          <img className="media-object" src={post.preview ? post.preview : post.image}/>
        )
      }
    }

    return (
      <Link to={"/posts/edit/" + post._id} key={post._id} className="list-group-item">
        <DraftBadge/>
        <div className="media">
          <div className="media-left media-middle">
             <PreviewImage/>
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
