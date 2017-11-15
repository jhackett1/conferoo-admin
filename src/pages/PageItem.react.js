import React, { Component } from 'react';
import Humandate from 'human-date';
import {Link} from 'react-router-dom';
import config from '../config';

class PageItem extends Component {

  render() {

    const post = this.props.page;

    const DraftBadge = () => {
      if(post.published === 'private'){
        return (<span className="badge">Private</span>);
      } else {
        return null;
      }
    }

    return (
      <Link to={"/pages/edit/" + post._id} key={post._id} className="list-group-item">
        <DraftBadge/>
        <h4 className="list-group-item-heading">{post.title}</h4>
      </Link>
    );
  }
}

export default PageItem;
