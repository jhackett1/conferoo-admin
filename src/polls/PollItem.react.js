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
      } else if (poll.published === 'inactive') {
        return (<span className="badge">Inactive</span>);
      } else {
        return null;
      }
    }

    return (
      <Link to={"/polls/edit/" + poll._id} key={poll._id} className='list-group-item'>
        <DraftBadge/>
          <h4 className="list-group-item-heading">{poll.question}</h4>
          <p className="list-group-item-text">{poll.detail}</p>
          <small>{Humandate.relativeTime(poll.createdAt)} | {poll.responses.length} responses</small>
      </Link>
    );
  }
}

export default EventItem;
