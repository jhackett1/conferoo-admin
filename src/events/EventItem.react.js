import React, { Component } from 'react';
import Humandate from 'human-date';
import {Link} from 'react-router-dom';
import config from '../config';

class EventItem extends Component {

  render() {

    const event = this.props.event;

    const DraftBadge = () => {
      if(event.published === 'private'){
        return (<span className="badge">Private</span>);
      } else {
        return null;
      }
    }

    const PreviewImage = () => {
      // Check whether the image is hosted on the API server first (i.e. does a preview exist?)
      if(event.image && event.image.startsWith(config.api_host)){
        // If so, take the supplied URL and fiddle it to return the preview instead
        var split = event.image.split('uploads');
        var previewImageURL = split[0] + 'uploads/previews' + split[1];
        return(
          <img className="media-object" src={previewImageURL}/>
        )
      } else {
        return(
          <img className="media-object" src={event.preview ? event.preview : event.image}/>
        )
      }
    }

    return (
      <Link to={"/events/edit/" + event._id} key={event._id} className='list-group-item'>
        <DraftBadge/>
        <div className="media">
          <div className="media-left media-middle">
            <PreviewImage/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{event.title}</h4>
          <p className="list-group-item-text">{event.teaser}</p>
          <small>{event.time} | {event.programme}</small>
          </div>
        </div>
      </Link>
    );
  }
}

export default EventItem;
