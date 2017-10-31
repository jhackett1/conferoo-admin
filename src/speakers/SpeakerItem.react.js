import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import config from '../config';

class SpeakerItem extends Component {

  render() {

    const speaker = this.props.speaker;

    const PreviewImage = () => {
      // Check whether the image is hosted on the API server first (i.e. does a preview exist?)
      if(speaker.image.startsWith(config.api_host)){
        // If so, take the supplied URL and fiddle it to return the preview instead
        var split = speaker.image.split('uploads');
        var previewImageURL = split[0] + 'uploads/previews' + split[1];
        return(
          <img className="media-object" src={previewImageURL}/>
        )
      } else {
        return(
          <img className="media-object" src={speaker.image}/>
        )
      }
    }

    return (
      <Link to={"/speakers/edit/" + speaker._id} key={speaker._id} className="list-group-item">
        <div className="media">
          <div className="media-left media-middle">
             <PreviewImage/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{speaker.name}</h4>
          <p className="list-group-item-text">{speaker.biography}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default SpeakerItem;
