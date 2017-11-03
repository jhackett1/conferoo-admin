import React, { Component } from 'react';
import Humandate from 'human-date';
import {Link} from 'react-router-dom';
import config from '../config';

class EventItem extends Component {

  render() {

    const poll = this.props.poll;

    const DraftBadge = () => {
      if(poll.published === 'private'){
        return (<span className="badge">Private</span>);
      } else {
        return null;
      }
    }

    return (
      <Link to={"/polls/edit/" + poll._id} key={poll._id} className='list-group-item'>
        <DraftBadge/>
        <div className="media">
          <div className="media-left media-middle">
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{poll.question}</h4>
          <p className="list-group-item-text">{poll.detail}</p>
          <small>{Humandate.relativeTime(poll.createdAt)}</small>
          </div>
        </div>
      </Link>
    );
  }
}

export default EventItem;
