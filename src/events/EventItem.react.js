import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class EventItem extends Component {

  render() {

    const event = this.props.event;

    return (
      <Link to={"/events/edit/" + event._id} key={event._id} className="list-group-item">
        <div className="media">
          <div className="media-left media-middle">
             <img className="media-object" src={event.image}/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{event.title}</h4>
          <p className="list-group-item-text">{event.teaser}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default EventItem;
